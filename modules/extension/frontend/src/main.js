// Set our correct module path so that we can use dynamic imports
__webpack_public_path__ = getModulePath();

import firebase from "firebase";
import { MESSAGES_FRONTEND_SOURCE } from "@diff/common/keys";
import { composeRemoteAction, fetchCacheToken } from "@diff/common/actions";
import { fromEvent, merge } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import Fx from "fx/Fx";

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

// get our initial user token
window.postMessage(
  composeRemoteAction(fetchCacheToken(), MESSAGES_FRONTEND_SOURCE),
  "*"
);

// // const renderApp = () => {
// //   const element = document.createElement("df-app");
// //   document.body.appendChild(element);
// // };

// // renderApp();

// Fx.bootstrapApplication().then(viewManager => {
//   Fx.view("df-app", App);
//   viewManager.addView("df-app");
// });

// LauncherWidget.load();

function getModulePath() {
  const bridgeScript = document.querySelector("#df-bridge");
  const loadPath = bridgeScript.src.split("/main.js")[0];
  return loadPath + "/";
}

const messages$ = fromEvent(window, "message")
  .pipe(
    filter(evt => {
      if (evt.source === MESSAGES_FRONTEND_SOURCE) {
        return false;
      }
      if (evt.data && evt.data.source === MESSAGES_FRONTEND_SOURCE) {
        return false;
      }
      if (evt.data === "") {
        return false;
      }
      return true;
    })
  )
  .subscribe(evt => {
    console.log(
      "[frontend] postMessage, from contentScript, type: MessageEvent",
      evt.data
    );
  });
