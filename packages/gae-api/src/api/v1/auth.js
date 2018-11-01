import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import { client as firestoreClient } from '../../firestore';
import logging from '../../logging';
import * as userCollection from '../../firestore/models/users';

const { admin, db } = firestoreClient;
const request = require('request');

const config = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_API_AUDIENCE: process.env.AUTH0_API_AUDIENCE
};

function clearCookies(res) {
  res.clearCookie('_df_id_token', { httpOnly: true });
  res.clearCookie('_df_access_token', { httpOnly: true });
  res.clearCookie('_df_refresh_token', { httpOnly: true });
  res.clearCookie('_df_expires_in', { httpOnly: true });
  res.clearCookie('_df_token_type', { httpOnly: true });
}

function setCookie(res, value) {
  res.cookie('_df_id_token', value.id_token, { httpOnly: true });
  res.cookie('_df_access_token', value.access_token, { httpOnly: true });
  res.cookie('_df_refresh_token', value.refresh_token, { httpOnly: true });
  res.cookie('_df_expires_in', value.refresh_token, { httpOnly: true });
  res.cookie('_df_token_type', value.token_type, { httpOnly: true });
}

// Auth0 athentication middleware
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  // audience: config.AUTH0_API_AUDIENCE,
  issuer: `https://${config.AUTH0_DOMAIN}/`,
  algorithm: 'RS256'
});

const cookieToken = (req, res, next) => {
  console.log('cookies', req.cookies._df_id_token);
  const token = req.cookies._df_id_token;
  if (!token) {
    return res.status(401).send('sorry not authorized');
  }

  req.headers.authorization = `Bearer ${token}`;

  console.log('headers now', req.headers.authorization);
  next();
};

const userProfileSync = async (req, res, next) => {
  logging.info('------------[first-time check] ----------');
  console.log('user is', req.user.sub);

  const userRef = db.collection('users').doc(req.user.sub);

  const userDoc = await userRef.get();

  if (userDoc.exists) {
    console.log('Syncing profile information');
    await userRef.update(req.user);
  } else {
    console.log('user does not exists');
    await userCollection.registerUser(req.user);
  }
  console.log(req.user);
  logging.info('-----------------------------------------');
  next();
};

// GET object containing Firebase custom token
export const login = [
  cookieToken,
  jwtCheck,
  userProfileSync,
  (req, res) => {
    // Create UID from authenticated Auth0 user
    const uid = req.user.sub;
    logging.debug(`JWT check uid ${JSON.stringify(req.user)}`);
    // Mint token using Firebase Admin SDK
    admin
      .auth()
      .createCustomToken(uid)
      .then(customToken => {
        logging.debug(`Firebase custom token for ${customToken}`);
        // Response must be an object or Firebase errors
        return res.json({ firebaseToken: customToken });
      })
      .catch(err =>
        res.status(500).send({
          message: 'Something went wrong acquiring a Firebase token.',
          error: err
        })
      );
  }
];

export const logout = (req, res) => {
  clearCookies(res);
  res.send(200);
};

export const refresh = (req, res) => {
  const {
    query: { refreshToken }
  } = req;

  if (!refreshToken) {
    res.send(401, 'refresh token required');
  }

  logging.debug(`Refreshing token for ${refreshToken}`);

  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    body: {
      grant_type: 'refresh_token',
      client_id: process.env.AUTH0_CLIENTID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      refresh_token: refreshToken
    },
    json: true
  };

  request(options, (error, response, body) => {
    if (error) {
      res.send(401);
    }

    res.send(200, body);
  });
};

export const profile = [
  cookieToken,
  jwtCheck,
  (req, res) => {
    res.status(200).json(req.user);
  }
];

export const codeGrantAuthorize = [
  (req, res, next) => {
    console.log('received a login event', req.query);

    const {
      query: { code }
    } = req;

    const options = {
      method: 'POST',
      url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      body: {
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENTID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: process.env.API_SERVER
      },
      json: true
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error('error', error);
        next(error);
      }
      console.log(body);

      req.headers.authorization = `Bearer ${body.id_token}`;
      req._user = body;
      next();
    });
  },
  jwtCheck,
  userProfileSync,
  (req, res) => {
    setCookie(res, req._user);
    res.redirect(301, req.query.origin);
  }
];

export const renewSession = async (req, res) => {
  const {
    query: { refreshToken }
  } = req;

  if (!refreshToken) {
    res.send(401, 'A refresh token is required');
  }

  const options = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    body: {
      grant_type: 'refresh_token',
      client_id: process.env.AUTH0_CLIENTID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      refresh_token: refreshToken
    },
    json: true
  };

  request(options, (error, response, body) => {
    if (error) {
      return res.send(403, error);
    }

    return res.send(200, body);
  });
};
