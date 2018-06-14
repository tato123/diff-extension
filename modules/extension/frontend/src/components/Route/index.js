import { LitElement, html } from "@polymer/lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";
/* eslint-disable */
class ElementRoute extends connect(store)(LitElement) {
  _render({ path, exact, route }) {
    if (route && path === route) {
      return html`<slot />`;
    }
    return html``;
  }

  static get properties() {
    return {
      exact: Boolean,
      path: String,
      route: String
    };
  }

  _stateChanged(state) {
    if (state) {
      this.route = state.location && state.location.route;
    }
  }
}

window.customElements.define("df-element-route", ElementRoute);
