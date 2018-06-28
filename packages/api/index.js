"use strict";
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const SwaggerExpress = require("swagger-express-mw");
const firebase = require("firebase");
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

// import express dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

// setup express
const app = express();

module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

// ----------------------------------------------------
// configure parsing and cors rules

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// parse plain text
app.use(bodyParser.text());
// configure cors
app.use(
  cors({
    origin: true
  })
);

app.use(compression());

// ----------------------------------------------------
// configure firebase
//
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://diff-204716.firebaseio.com"
});

// initialize the firebase app
firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID
});

// ----------------------------------------------------
// create swagger

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 8080;
  app.listen(port);

  console.log(`Application running at: ${port}`);
});
