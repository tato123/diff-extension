const firebase = require("firebase");
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");
const config = require("./config");

// import express dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//
app.use(
  cors({
    origin: true
  })
);

// initialize the admin app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://diff-204716.firebaseio.com"
});

// initialize the firebase app
firebase.initializeApp(config);

const signup = (req, res) => {
  console.log("[Signup request]", req.query);
};

app.get("/", (req, res) => {
  res.send(200, "running");
});

app.post("/authenticate", (req, res) => {
  const { username, password } = req.body;
  console.log("[Authentication request]", username);

  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then(credential => {
      console.log("User signed in", username);
      const { user } = credential;
      return admin.auth().createCustomToken(user.uid);
    })
    .then(function(customToken) {
      res.send(200, customToken);
    })
    .catch(error => {
      res.send(401, error);
    });
});

app.listen(PORT, function() {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
