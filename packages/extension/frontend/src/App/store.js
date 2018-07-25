import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import { postmessageMiddleware, asyncMiddleware } from "redux/remote";
import firebase from "firebase";

import diff from "redux/diff";
import selectors from "redux/selectors";
import launcher from "redux/launcher";
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
const db = firebase.firestore();

export default function configureStore(preloadedState) {
  const middlewares = [
    thunkMiddleware.withExtraArgument({ db }),
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
    diff,
    selectors,
    launcher,
    user,
    widgets,
    entities
  });

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./index", () => store.replaceReducer(rootReducer));
  }
  return store;
}
