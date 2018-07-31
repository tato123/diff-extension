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
  const querySnapshot = await db
    .collection("events")
    .where("meta.userId", "==", "qJtKNnA9TlYeUFRaa1ANlXrMwSb2")
    .get();
  let validCount = 0;
  let invalidCount = 0;
  let upgraded = 0;

  querySnapshot.forEach(doc => {
    const data = doc.data();

    // {
    //     "protocol": "https:",
    //     "slashes": true,
    //     "auth": null,
    //     "host": "storage.googleapis.com",
    //     "port": null,
    //     "hostname": "storage.googleapis.com",
    //     "hash": null,
    //     "search": null,
    //     "query": null,
    //     "pathname": "/diff-tester/index.html",
    //     "path": "/diff-tester/index.html",
    //     "href": "https://storage.googleapis.com/diff-tester/index.html"
    // }
    if (data.url) {
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

      console.log(data);
      validCount++;
    } else {
      invalidCount++;
    }
  });

  console.log("-------------------------------------");
  console.log("Invalid Records: ", invalidCount);
  console.log("Valid Records:   ", validCount);
  console.log("Upgraded Records:", upgraded);
};

readEvents();
