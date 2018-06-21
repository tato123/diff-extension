/*eslint-disable*/
__webpack_public_path__ =
  "chrome-extension://ablcegjlfbphmccdhdeldjefadcopgdm/frontend/";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

function getModulePath() {
  const bridgeScript = document.querySelector("#df-bridge");
  const loadPath = bridgeScript.src.split("/main.js")[0];
  return loadPath + "/";
}

// function initializeFirebase() {
//   // connect to firebase
//   const config = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DATABASE_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_SENDER_ID
//   };
//   firebase.initializeApp(config);
// }

function bootstrap() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="root">
    </div>
  
  
  `
  );
  return Promise.resolve("root");
}

bootstrap().then(id => {
  console.log(id);
  ReactDOM.render(<App />, document.getElementById(id));
});
