import { LitElement, html } from "@polymer/lit-element";
import "./popper";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";
import { threadCountForSelectors } from "selectors/selector";

export default class Selectors extends connect(store)(LitElement) {
  _render({ selectors = [] }) {
    return html`
      ${selectors.map(({ selector, count }, idx) => {
        return html`          
          <df-popper 
            duration="150"
            delay="0"
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
