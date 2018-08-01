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
    const querySnapshot = await db.collection("events").get();
    let validCount = 0;
    let invalidCount = 0;
    let upgraded = 0;

    querySnapshot.forEach(async doc => {
      const data = doc.data();

      if (data.url && typeof data.url === "string") {
        const url = urlParser.parse(data.url);
        const record = _.omit(url, [
          "slashes",
          "auth",
          "parse",
          "format",
          "resolve",
          "resolveObject",
          "parseHost"
        ]);
        validCount++;
        console.log("old url", data.url);
        const newObj = Object.assign(data, { url: record });
        const docRef = doc.ref;
        await docRef.set(newObj);
        console.log("upgraded object");
      } else if (data.url && typeof data.url === "object") {
        console.log("------------------------------------------");
        console.log(data);
        validCount++;
      } else {
        const docRef = doc.ref;
        await docRef.delete();
        invalidCount++;
      }
    });
    console.log("-------------------------------------");
    console.log("Invalid Records: ", invalidCount);
    console.log("Valid Records:   ", validCount);
    console.log("Upgraded Records:", upgraded);
  } catch (err) {
    console.error(err);
  }
};

readEvents();
