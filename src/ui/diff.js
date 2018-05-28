import Bubble from "./Bubble";
import Icon from "./Icon";
import Button from "./Button";
import Tabs from "./Tabs";
import DateSelector from "./DateSelector";

const NameSpacedComponent = (ns, components) => {
  Object.keys(components).forEach(name => {
    window.customElements.define(`${ns}-${name}`, components[name]);
  });
};

NameSpacedComponent("df", {
  bubble: Bubble,
  icon: Icon,
  button: Button,
  "date-select": DateSelector,
  tabs: Tabs
});
