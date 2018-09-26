const userId = "v5Yrl6gf3UOCJ2v2OkiheyLzlov1";

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const admin = require("firebase-admin");
const serviceAccount = require("../../key.json");

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
      .where("meta.userId", "==", userId)
      .get();
    let objectCount = 0;
    querySnapshot.forEach(async doc => {
      await doc.ref.delete();
      objectCount++;
    });
    console.log("-------------------------------------");
    console.log("Records:", objectCount);
  } catch (err) {
    console.error(err);
  }
};

readEvents();
