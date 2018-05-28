import { LitElement, html } from "@polymer/lit-element";
import firebase from "firebase";

import { newValue } from "../../actions/firebase";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store";

export default class Modal extends connect(store)(LitElement) {
  _render() {
    return html`<slot />`;
  }

  _firstRendered() {
    const db = firebase.firestore();
    const settings = { /* your settings... */ timestampsInSnapshots: true };
    db.settings(settings);
    db
      .collection("domains")
      .doc("storage.googleapis.com")
      .collection("node")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          store.dispatch(newValue(doc.data()));
        });
      })
      .catch(err => {
        console.error("[fb err]", err);
      });
  }

  _stateChanged(state) {}
}

window.customElements.define("df-firebase-app", Modal);
