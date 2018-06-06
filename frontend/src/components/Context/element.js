import { LitElement } from "@polymer/lit-element";

import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "store";

import { getUser } from "actions/user";

export default class Context extends connect(store)(LitElement) {
  _render({ user }) {}

  static get properties() {
    return {
      user: Object
    };
  }

  _firstRendered() {
    store.dispatch(getUser());
  }

  _stateChanged(state) {
    if (state) {
      // change to a selector
      this.user = state.user;
    }
  }
}
