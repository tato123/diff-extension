// import "@webcomponents/webcomponentsjs/webcomponents-loader.js";
import Bubble from "./Bubble";
import Icon from "./Icon";

const NameSpacedComponent = (ns, components) => {
  Object.keys(components).forEach(name => {
    window.customElements.define(`${ns}-${name}`, components[name]);
  });
};

NameSpacedComponent("df", {
  bubble: Bubble,
  icon: Icon
});
