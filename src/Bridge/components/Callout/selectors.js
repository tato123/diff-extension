import { LitElement, html } from "@polymer/lit-element";
import "./popper";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";

export default class Selectors extends connect(store)(LitElement) {
  _render({ selectors = [] }) {
    return html`
      ${selectors.map((data, idx) => {
        return html`          
          <df-popper 
            duration="250"
            delay=${idx * 350}
            element="${data.selector}" count="${idx + 1}" />
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
