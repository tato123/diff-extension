import "./polyfill";
import Launcher from "./components/Launcher";

window.customElements.define("howto-checkbox", Launcher);

document.body.insertAdjacentHTML(
  "beforeend",
  `<howto-checkbox id="join-checkbox" role="checkbox" tabindex="0">This is a test</howto-checkbox>`
);
