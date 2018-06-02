import { LitElement, html } from "@polymer/lit-element";
import firebase from "firebase";

import { newValue } from "../../actions/firebase";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store";

export default class Modal extends connect(store)(LitElement) {
  _render() {
    return html`<slot />`;
  }

  constructor() {
    super();
    const db = firebase.firestore();
    const settings = { /* your settings... */ timestampsInSnapshots: true };
    db.settings(settings);
    this.db = db;
  }

  _firstRendered() {
    this._comments();

    firebase
      .auth()
      .signInWithEmailAndPassword("fontanezj1@gmail.com", "password")
      .then(credential => {
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
