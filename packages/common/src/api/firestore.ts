import firebase from 'firebase/app';
import 'firebase/firestore';

let firestore: firebase.firestore.Firestore | null = null;

const initIfNew = (): firebase.firestore.Firestore => {
  console.log('[plugin - firebase] initializing connection');

  // connect to firebase
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
  };

  firebase.initializeApp(config);

  firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);

  return firestore;
};

/**
 * Handles initializion that is required for our firebase application
 */
export const initializeFirestore = (): firebase.firestore.Firestore =>
  !firebase.apps.length ? initIfNew() : firebase.app().firestore();
