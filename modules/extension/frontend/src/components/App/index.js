import { LitElement, html } from "@polymer/lit-element";
import firebase from "firebase";

import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "store";

export default class App extends connect(store)(LitElement) {
  _render() {
    return html`
        <style>
          @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700');
          @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,700');
          
          :root {          
            font-family: 'Roboto', wingdings;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
  
            box-sizing: border-box;
            line-height: 1.6;
            letter-spacing: 0.2px;
            text-rendering: geometricPrecision;
          }
          
        </style>        
    `;
  }

  constructor() {
    super();
    this.initializeFirebase();
  }

  initializeFirebase() {
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_SENDER_ID
    };
    firebase.initializeApp(config);
  }
}
