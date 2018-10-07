import React from 'react';
import ReactDOM from 'react-dom';
import AppRoot from './features';

import configureStore from './store';

// Create our new store
const store = configureStore();

const ROOT_ID = `df-rt-${Math.floor(Math.random() * 100000)}`;

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
    <App store={store} />,

    document.getElementById(ROOT_ID)
  );
};

bootstrap().then(() => {
  render(AppRoot);
});

if (module.hot) {
  module.hot.accept('./features/index.js', () => {
    const NextRootContainer = require('./features/index.js').default;
    render(NextRootContainer);
  });
}
