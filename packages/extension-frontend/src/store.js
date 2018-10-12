import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { initApi } from '@diff/common';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { postmessageMiddleware } from './middleware/remote';

import { epics as entitiesEpic } from './entities';
import rootReducer from './rootReducer';

export default function configureStore(preloadedState) {
  const api = initApi();

  // Setup redux-observable
  const rootEpic = combineEpics(entitiesEpic);
  const epicMiddleware = createEpicMiddleware({
    dependencies: { api }
  });

  // Setup our middlewares
  const middlewares = [epicMiddleware, postmessageMiddleware];

  const composedEnhancers = composeWithDevTools({
    maxAge: 10000000
  });

  // Finally - Create our store
  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancers(applyMiddleware(...middlewares))
  );

  // Start watching our actions with our epic middleware
  epicMiddleware.run(rootEpic);
  return store;
}
