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

export const codeGrantAuthorize = [
  (req, res, next) => {
    const {
      query: { code, redirectUri }
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
        redirect_uri: redirectUri
      },
      json: true
    };

    request(options, (error, response, body) => {
      if (error) {
        next(error);
      }

      req.headers.authorization = `Bearer ${body.id_token}`;
      req._user = body;
      next();
    });
  },
  jwtCheck,
  userProfileSync,
  (req, res) => {
    res.status(200).send(req._user);
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
