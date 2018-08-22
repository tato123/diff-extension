const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const admin = require("firebase-admin");
const serviceAccount = require("../../key.json");
const urlParser = require("url");
const _ = require("lodash");

// ----------------------------------------------------
// configure firebase
//
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// get the db
const db = admin.firestore();

const readEvents = async () => {
  try {
    const querySnapshot = await db
      .collection("events")
      .where("meta.workspaceId", "==", "7G46svcFXw5YuCKSXAtp")
      .get();
    let objectCount = 0;
    querySnapshot.forEach(async doc => {
      const data = doc.data();
      objectCount++;

      // create our new workspace record
      console.log("AccountId", data.meta.userId);
      // remove the account record
      delete data.meta.workspaceId;

      await doc.ref.set(data);
    });
    console.log("-------------------------------------");
    console.log("Records:", objectCount);
  } catch (err) {
    console.error(err);
  }
};

readEvents();
