import { LitElement, html } from "@polymer/lit-element";
import "./components/Launcher";
import "./components/Firebase/listener";
import "./components/Route";
import "./components/Callout/selectors";
import { navigateTo } from "./actions/location";

import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "./store.js";

export default class App extends connect(store)(LitElement) {
  _render({ selectRoute }) {
    return html`
      <df-firebase-app>
        <df-launcher on-click="${this.onLauncherClick}"></df-launcher>
        <df-element-route path="${selectRoute}">
          <df-selectors />
        </df-element-route>                        
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
    const routeTo = this.selectRoute === this.route ? "/" : this.selectRoute;
    store.dispatch(navigateTo(routeTo));
  }

  _stateChanged(state) {
    if (state) {
      this.route = state.location.route;
    }
  }
}

window.customElements.define("df-app", App);
