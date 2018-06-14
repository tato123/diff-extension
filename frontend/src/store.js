import {
  createStore,
  compose as origCompose,
  combineReducers,
  applyMiddleware
} from "redux";
import { lazyReducerEnhancer } from "pwa-helpers/lazy-reducer-enhancer.js";
import { createEpicMiddleware } from "redux-observable";

import rootEpic from "./epics";

// import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
// import mySaga from "./sagas";

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

// create the saga middleware
// const sagaMiddleware = createSagaMiddleware();

const epicMiddleware = createEpicMiddleware(rootEpic);

export const store = createStore(
  (state, action) => state,
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(epicMiddleware))
);

// Initially loaded reducers.
store.addReducers(reducer);
