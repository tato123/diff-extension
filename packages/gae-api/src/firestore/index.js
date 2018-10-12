import * as firebaseAdmin from 'firebase-admin';

export const admin = firebaseAdmin;

// load our key
const serviceAccount = require('./key.json');

firebaseAdmin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const dbInstance = admin.firestore();
const settings = { timestampsInSnapshots: true };
dbInstance.settings(settings);
export { dbInstance as db };
