import { LitElement, html } from "@polymer/lit-element";
import "./index";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";

export default class Selectors extends connect(store)(LitElement) {
  _render({ selectors = [] }) {
    return html`
      ${selectors.map(data => {
        return html`
          <df-callout element="${data.selector}" count="1" />
        `;
      })}
    `;
  }

  static get properties() {
    return {
      selectors: Array
    };
  }

  _stateChanged(state) {
    if (state) {
      this.selectors = state.entities.selectors;
    }
  }
}

window.customElements.define("df-selectors", Selectors);
