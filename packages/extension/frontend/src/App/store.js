import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import { postmessageMiddleware, asyncMiddleware } from "redux/remote";
import firebase from "firebase";

import user from "redux/user";
import widgets from "redux/widgets";
import entities from "redux/entities";

console.log("[plugin - firebase] initializing connection");
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

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default function configureStore(preloadedState) {
  const middlewares = [
    thunkMiddleware.withExtraArgument({ db: firestore }),
    asyncMiddleware,
    postmessageMiddleware
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const composedEnhancers = composeEnhancers(...enhancers);

  const rootReducer = combineReducers({
    user,
    widgets,
    entities
  });

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
