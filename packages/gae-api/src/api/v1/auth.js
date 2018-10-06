import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import { admin } from '../../firestore';
import logging from '../../logging';

const request = require('request');

const config = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_API_AUDIENCE: process.env.AUTH0_CLIENTID
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

// GET object containing Firebase custom token
export const login = [
  jwtCheck,
  (req, res) => {
    // Create UID from authenticated Auth0 user
    const uid = req.user.sub;
    logging.debug(`JWT check uid ${JSON.stringify(req.user.sub)}`);
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
