import { applyMiddleware, createStore, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import initApi from "../api";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { postmessageMiddleware, asyncMiddleware } from "redux/remote";

import user, { epics as userEpics } from "redux/user";
import widgets, { epics as widgetEpics } from "redux/widgets";
import entities, { epics as entitiesEpic } from "redux/entities";

export default function configureStore(preloadedState) {
  const api = initApi();

  // Setup redux-observable
  const rootEpic = combineEpics(entitiesEpic, widgetEpics, userEpics);
  const epicMiddleware = createEpicMiddleware({
    dependencies: { db: api.db$, api: api }
  });

  // Setup our middlewares
  const middlewares = [
    thunkMiddleware.withExtraArgument({ db: api.db$, api: api }),
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
