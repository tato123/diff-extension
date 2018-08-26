const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const admin = require("firebase-admin");

module.exports = function() {
  const serviceAccount = require("../../key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });

  // get the db
  const db = admin.firestore();
  return db;
};
