import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { initApi, AuthProvider } from '@diff/common';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { postmessageMiddleware } from './middleware/remote';

import { epics as entitiesEpic } from './entities';
import { epics as featureEpic } from './features';
import rootReducer from './rootReducer';

export default function configureStore(preloadedState) {
  const api = initApi();
  const authProvider = new AuthProvider(
    process.env.AUTH0_DOMAIN,
    process.env.AUTH0_CLIENT_ID
  );

  // Setup redux-observable
  const rootEpic = combineEpics(entitiesEpic, featureEpic);
  const epicMiddleware = createEpicMiddleware({
    dependencies: { api, authProvider }
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
