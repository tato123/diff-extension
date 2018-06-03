import { LitElement, html } from "@polymer/lit-element";
import firebase from "firebase";

import { connect as firebaseConnect } from "./client";

import { newValue } from "../../actions/firebase";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store";

export default class Modal extends connect(store)(LitElement) {
  _render() {}

  constructor() {
    super();

    // create our observable store
    this.firebaseRef = firebaseConnect();

    const db = firebase.firestore();
    const settings = { /* your settings... */ timestampsInSnapshots: true };
    db.settings(settings);
    this.db = db;
  }

  _firstRendered() {
    this._comments();

    const idToken =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJFR1JkNVZlRXEyUExyWmo3TEZGMXNzRWR5VksyIiwiaWF0IjoxNTI3OTY3NTY3LCJleHAiOjE1Mjc5NzExNjcsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstcXhxOHlAZGlmZi0yMDQ3MTYuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay1xeHE4eUBkaWZmLTIwNDcxNi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSJ9.ooFbcCWHhnfbTCqihmIxDUZT71JkYnt2bzlp4JCnF55I9ERoDj2iyz9nqR8hzKaL-XvbB37uofRb-NEU-pzYDbX2g6-70fL3B_RcIS7udrspvfGxgYRaZU29IUm3BSmVmBFGOXepTY_RiSXy1xk7q5llGkcnPHuPedC9yZDt4-hcyaceJsgrUFOGxR3NnjN2YzdUtUBZ9KMZeU63ncoosbEBOQzKJznqfTug4SPNpEUpPk7s1np6DXN8umbngACPLdUkv_oEcpELzY85mNcwJVoAubDFUbRX3mreaNmnmid-U3tmPgl3TQRkUxm9BsQ5v1w_n2lhHTTcmECm2gYrWQ";
    firebase
      .auth()
      .signInWithCustomToken(idToken)
      .then(credential => {
        console.log("Signed in with credential", credential);
        const { user } = credential;
        const userRef = this.db.doc(`users/${user.uid}`);

        const data = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };

        return userRef.set(data, { merge: true });
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  _comments() {
    this.db
      .collection("domains")
      .doc("storage.googleapis.com")
      .collection("node")
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          store.dispatch(newValue(doc.data()));
        });
      });
  }

  _stateChanged(state) {}
}

window.customElements.define("df-firebase-app", Modal);
