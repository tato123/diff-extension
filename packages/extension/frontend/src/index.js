import App from "./App/index";
import React from "react";
import ReactDOM from "react-dom";

const ROOT_ID = "root";

const bootstrap = () => {
  const rootElement = document.createElement("div");
  rootElement.id = ROOT_ID;
  document.body.appendChild(rootElement);
  return Promise.resolve(ROOT_ID);
};

const render = App => {
  ReactDOM.render(<App />, document.getElementById(ROOT_ID));
};

bootstrap().then(id => {
  render(App);
});

if (module.hot) {
  module.hot.accept("./App/index.js", () => {
    const NextRootContainer = require("./App/index.js").default;
    render(NextRootContainer);
  });
}
