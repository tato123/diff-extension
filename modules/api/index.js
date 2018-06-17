const firebase = require("firebase");
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");
const config = require("./config");

// import express dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// setup express
const app = express();
const PORT = process.env.PORT || 8080;

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

// initialize the admin app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://diff-204716.firebaseio.com"
});

// initialize the firebase app
firebase.initializeApp(config);

app.use("/", require("./routes"));

app.listen(PORT, function() {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
