import firebase from "firebase";

export default {
  exposed: {
    // expose effects for access from dispatch plugin
    firebaseSnapshots: {}
  },
  onInit() {
    console.log("[plugin - firebase] initializing connection");
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

    this.db = firebase.firestore();
  },
  onModel(model) {
    if (!model.firebaseSnapshots) {
      return;
    }

    const firebaseEffects =
      typeof model.firebaseSnapshots === "function"
        ? model.firebaseSnapshots(this.dispatch, this.db)
        : model.firebaseSnapshots;

    Object.keys(firebaseEffects).map(key => firebaseEffects[key]());
  }
};
