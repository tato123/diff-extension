import { LitElement, html } from "@polymer/lit-element";
import firebase from "firebase";

export default class Modal extends LitElement {
  static get properties() {
    return {
      kick: Function
    };
  }

  _firstRendered() {
    const db = firebase.firestore();
    const settings = { /* your settings... */ timestampsInSnapshots: true };
    db.settings(settings);
    const docs = db
      .collection("domains")
      .doc("storage.googleapis.com")
      .collection("node")
      .where("type", "==", "selector")
      .get()
      .then(querySnapshot => {
        this.dispatchEvent(
          new CustomEvent("counter-incremented", { detail: querySnapshot })
        );
      })
      .catch(err => {
        console.error("[fb err]", err);
      });
  }

  _render() {
    return html``;
  }
}

window.customElements.define("df-firebase", Modal);
