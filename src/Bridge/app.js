import "@polymer/polymer";
import { LitElement, html } from "@polymer/lit-element";
import "./components/Launcher";
import "./components/Firebase/listener";
import Popper from "popper.js";

export default class Callout extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
    this._onKick = this._onKick.bind(this);
  }

  _render({}) {
    return html`
      <div>
      <df-firebase on-counter-incremented=${this._onKick}></df-firebase>
      <df-launcher></df-launcher>
      </div>
    `;
  }

  _onKick({ detail: querySnapshot }) {
    querySnapshot.forEach(doc => {
      const data = doc.data();
      console.log("[fb snapshot]", data);
      const elm = document.querySelector(data.selector);

      const callout = document.createElement("df-callout");
      callout.alerts = 1;

      document.body.appendChild(callout);

      new Popper(elm, callout, {
        placement: "left-start"
      });
    });
  }

  _onSelector(selector) {
    this.pageSelectors.push(selector);
  }
}

window.customElements.define("df-app", Callout);
