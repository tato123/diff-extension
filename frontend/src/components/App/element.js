import { LitElement, html } from "@polymer/lit-element";

import { navigateTo } from "actions/location";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "store";
import { routeSelector } from "selectors/location";

import "components/Launcher";
import "components/Firebase/listener";
import "components/Route";
import "components/Callout";
import "components/Modal";
import "components/Login";
import "components/ui";

const AuthenticatedRoute = template => context => {
  if (!context.token) {
    console.log("not authenticated");
    store.dispatch(navigateTo("/login"));
    return html``;
  }
};

export default class App extends connect(store)(LitElement) {
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
        <df-firebase-app></df-firebase-app>
        
        ${this.renderAppRoute(route)}       
    `;
  }

  get routes() {
    return [
      {
        path: "/",
        component: AuthenticatedRoute(html`
          <df-launcher on-click="${this.onLauncherClick}"></df-launcher>
        `)
      },
      {
        path: "/selector",
        component: AuthenticatedRoute(html`
          <df-launcher on-click="${this.onLauncherClick}"></df-launcher>
          <df-selectors></df-action-menu>
        `)
      },
      {
        path: "/selector/view",
        component: AuthenticatedRoute(html`<df-selectors></df-action-menu>`)
      },
      {
        path: "/login",
        component: html`<df-login></df-login>`
      }
    ];
  }

  get context() {
    return {};
  }

  renderAppRoute(route) {
    console.log("return routes", route);
    const outputTemplate = this.routes.reduce((acc, appRoute) => {
      if (route && route.startsWith(appRoute.path)) {
        // if it matches then check the next step
        if (typeof appRoute.component === "function") {
          return appRoute.component(this.context);
        }
        return appRoute.component;
      }
    }, html``);

    console.log("template", outputTemplate);
    return outputTemplate;
  }

  static get properties() {
    return {
      route: String,
      token: String
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
    this.route = routeSelector(state);
  }
}
