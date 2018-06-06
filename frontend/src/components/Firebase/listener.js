import { LitElement, html } from "@polymer/lit-element";
import firebase from "firebase";

import { connect as firebaseConnect } from "./client";

import { newValue } from "../../actions/firebase";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store";

import { userTokenSelector } from "selectors/user";

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
    this.comments();
  }

  _stateChanged(state) {
    const userToken = userTokenSelector(state);
    if (userToken !== this.userToken) {
      this.userToken = userToken;
      this.performLogin(userToken);
    }
  }

  comments() {
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

  performLogin(userToken) {
    if (!userToken) {
      return;
    }
    firebase
      .auth()
      .signInWithCustomToken(userToken)
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
}

window.customElements.define("df-firebase-app", Modal);
