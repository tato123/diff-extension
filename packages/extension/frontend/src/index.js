import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux";

const ROOT_ID = "root";
const store = configureStore();

const bootstrap = () => {
  const rootElement = document.createElement("div");
  rootElement.id = ROOT_ID;
  document.body.appendChild(rootElement);
  return Promise.resolve(ROOT_ID);
};

const render = RootComponent => {
  ReactDOM.render(
    <Provider store={store}>
      <RootComponent />
    </Provider>,
    document.getElementById(ROOT_ID)
  );
};

bootstrap().then(id => {
  render(App);
});

if (module.hot) {
  module.hot.accept("./components/App.js", () => {
    const NextRootContainer = require("./components/App.js").default;
    render(NextRootContainer);
  });
}
