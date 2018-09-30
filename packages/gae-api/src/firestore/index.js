import firebaseAdmin from 'firebase-admin';

export const admin = firebaseAdmin;

// load our key
const serviceAccount = require('./key.json');

firebaseAdmin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

export const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);
