import { LitElement, html } from "@polymer/lit-element";
import "./components/Launcher";
import "./components/Firebase/listener";
import "./components/Route";
import "./components/Callout";
import "./components/Modal";
import { navigateTo } from "./actions/location";

import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "./store.js";

import "ui/diff";

export default class App extends connect(store)(LitElement) {
  selectorWidgetFactory(route) {
    if (route && route.startsWith("/selector")) {
      return html`<df-selectors />`;
    }
  }

  modalWidgetFactory(route) {
    if (route && route.startsWith("/selector/view")) {
      return html`<df-action-menu />`;
    }
  }

  _render({ route }) {
    return html`    
      <df-firebase-app>        
        <df-launcher on-click="${this.onLauncherClick}"></df-launcher>
        ${this.selectorWidgetFactory(route)}
        ${this.modalWidgetFactory(route)}                       
      </df-firebase-app>      
    `;
  }

  static get properties() {
    return {
      selectRoute: String,
      route: String
    };
  }

  constructor() {
    super();
    this.onLauncherClick = this.onLauncherClick.bind(this);
    this.selectRoute = "/selector";
  }

  onLauncherClick() {
    const routeTo = this.route !== "/" ? "/" : this.selectRoute;
    store.dispatch(navigateTo(routeTo));
  }

  _stateChanged(state) {
    if (state) {
      this.route = state.location.route;
    }
  }
}

window.customElements.define("df-app", App);
