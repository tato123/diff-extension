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
    this.comments();
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

  _stateChanged(state) {}
}

window.customElements.define("df-firebase-app", Modal);
