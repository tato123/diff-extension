import { LitElement, html } from "@polymer/lit-element";
import "./popper";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";
import { threadCountForSelectors } from "Bridge/selectors/selector";

export default class Selectors extends connect(store)(LitElement) {
  _render({ selectors = [] }) {
    return html`
      ${selectors.map(({ selector, count }, idx) => {
        return html`          
          <df-popper 
            duration="250"
            delay=${idx * 350}
            element="${selector}" 
            count="${count}" />
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
      this.selectors = threadCountForSelectors(state);
    }
  }
}

window.customElements.define("df-selectors", Selectors);
