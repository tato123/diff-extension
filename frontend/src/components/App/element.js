import { LitElement, html } from "@polymer/lit-element";

import { navigateTo } from "actions/location";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "store";

import "components/Launcher";
import "components/Firebase/listener";
import "components/Route";
import "components/Callout";
import "components/Modal";
import "components/Context";
import "components/Login";
import "components/ui";

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
      <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700');
        @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,700');
        
        :root {          
          font-family: 'Roboto', wingdings;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          box-sizing: border-box;
          line-height: 1.6;
          letter-spacing: 0.2px;
          text-rendering: geometricPrecision;
        }
        
      </style>    
        <df-context></df-context>
        <df-firebase-app></df-firebase-app>
        <df-launcher on-click="${this.onLauncherClick}"></df-launcher>


        ${this.selectorWidgetFactory(route)}
        ${this.modalWidgetFactory(route)}
      
    `;
  }

  static get properties() {
    return {
      route: String
    };
  }

  constructor() {
    super();
    this.onLauncherClick = this.onLauncherClick.bind(this);
  }

  onLauncherClick() {
    const routeTo = this.route !== "/" ? "/" : "/selector";
    store.dispatch(navigateTo(routeTo));
  }

  _stateChanged(state) {
    if (state) {
      this.route = state.location.route;
    }
  }
}
