import * as firebaseAdmin from 'firebase-admin';

const admin = firebaseAdmin;

// load our key
const path = require('path');

const serviceAccount = require(path.resolve(__dirname, './key.json'));

firebaseAdmin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const dbInstance = admin.firestore();
const settings = { timestampsInSnapshots: true };
dbInstance.settings(settings);

export default {
  db: dbInstance,
  admin
};
