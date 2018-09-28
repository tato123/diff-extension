import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import FeatureFlag from 'components/FeatureFlags';
import App from './App/index';
import Appv2 from './App_v2/index';
import configureStore from './store';

const ROOT_ID = `df-rt-${Math.floor(Math.random() * 100000)}`;

// Create our new store
const store = configureStore();

const bootstrap = () => {
  const rootElement = document.createElement('div');
  rootElement.id = ROOT_ID;
  rootElement.style.position = 'absolute';
  rootElement.style.top = 0;
  rootElement.style.left = 0;
  rootElement.style.width = 0;
  rootElement.style.height = 0;
  // give us layers at the end of the safe spectrum
  rootElement.style.zIndex = Number.MAX_SAFE_INTEGER - 100;
  document.body.appendChild(rootElement);
  return Promise.resolve(ROOT_ID);
};

const render = App => {
  ReactDOM.render(
    <Provider store={store}>
      <FeatureFlag
        name="version2"
        enabled={() => <Appv2 />}
        disabled={() => <App />}
        value="true"
      />
    </Provider>,
    document.getElementById(ROOT_ID)
  );
};

bootstrap().then(id => {
  render(App);
});

if (module.hot) {
  module.hot.accept('./App/index.js', () => {
    const NextRootContainer = require('./App/index.js').default;
    render(NextRootContainer);
  });

  module.hot.accept('./App_v2/index.js', () => {
    const NextRootContainer = require('./App_v2/index.js').default;
    render(NextRootContainer);
  });
}
