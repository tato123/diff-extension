/*eslint-disable*/
__webpack_public_path__ =
  "chrome-extension://ablcegjlfbphmccdhdeldjefadcopgdm/frontend/";

// Set our correct module path so that we can use dynamic imports
import Vue from "vue";
import Vuex from "vuex";
import VuexStore from "./store";

import App from "App";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.config.ignoredElements = [/^df-/];

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
  const placeholder = document.createElement("div");
  placeholder.id = "root";
  document.body.appendChild(placeholder);
  return Promise.resolve("#root");
}

bootstrap().then(id => {
  const store = new Vuex.Store(VuexStore);
  const app = new Vue({
    el: id,
    store,
    components: { App },
    template: "<App />"
  });
});
