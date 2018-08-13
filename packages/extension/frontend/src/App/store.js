import { applyMiddleware, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { initializeFirestore } from "./firestore";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { postmessageMiddleware, asyncMiddleware } from "redux/remote";

import user, { epics as userEpics } from "redux/user";
import widgets, { epics as widgetEpics } from "redux/widgets";
import entities, { epics as entitiesEpic } from "redux/entities";

console.log("[plugin - firebase] initializing connection");

const firestore = initializeFirestore();

export default function configureStore(preloadedState) {
  // Setup redux-observable
  const rootEpic = combineEpics(entitiesEpic, widgetEpics, userEpics);
  const epicMiddleware = createEpicMiddleware({
    dependencies: { db: firestore }
  });

  // Setup our middlewares
  const middlewares = [
    thunkMiddleware.withExtraArgument({ db: firestore }),
    asyncMiddleware,
    epicMiddleware,
    postmessageMiddleware
  ];

  const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  // Setup our reducers
  const rootReducer = combineReducers({
    user,
    widgets,
    entities
  });

  // Finally - Create our store
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // Start watching our actions with our epic middleware
  epicMiddleware.run(rootEpic);
  return store;
}
