// routes.js
// Dependencies
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const firebaseAdmin = require('firebase-admin');
// Config
const config = require('./config');

// Auth0 athentication middleware
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: config.AUTH0_API_AUDIENCE,
  issuer: `https://${config.AUTH0_DOMAIN}/`,
  algorithm: 'RS256'
});

// Initialize Firebase Admin with service account
const serviceAccount = require(config.FIREBASE_KEY);
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: config.FIREBASE_DB
});

// GET object containing Firebase custom token
app.get('/auth/firebase', jwtCheck, (req, res) => {
  // Create UID from authenticated Auth0 user
  const uid = req.user.sub;
  // Mint token using Firebase Admin SDK
  firebaseAdmin
    .auth()
    .createCustomToken(uid)
    .then(customToken =>
      // Response must be an object or Firebase errors
      res.json({ firebaseToken: customToken })
    )
    .catch(err =>
      res.status(500).send({
        message: 'Something went wrong acquiring a Firebase token.',
        error: err
      })
    );
});
