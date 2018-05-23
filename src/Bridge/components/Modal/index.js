import { LitElement, html } from "@polymer/lit-element";
import theme from "../Theme";
import "./diff-logo";
import "@vaadin/vaadin-combo-box/vaadin-combo-box.js";
import "@vaadin/vaadin-tabs/vaadin-tabs.js";
import "@polymer/iron-pages";

export default class Modal extends LitElement {
  static get properties() {
    return {
      page: {
        type: Number
      }
    };
  }

  constructor() {
    super();
    this.page = 0;
  }

  renderDatePicker() {
    return html`
      <div class="form-control">
        <vaadin-combo-box id="demo1-1" label="Date Range"></vaadin-combo-box>          
      </div>
    `;
  }

  renderHeader() {
    return html`
        <div>
          <df-logo />
          </div>
    `;
  }

  _render({ page }) {
    return html`
      ${theme}
      <style>
        .modal {          
          width: 340px;
          height: 627px;
          background: linear-gradient(to right, #171A3A , #221F41);
          position: absolute;
          top: 32px;
          left: 500px;
          border-radius: 8px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
          padding: 36px;
          display: grid;
          grid-row-gap: 26px;
          grid-template-columns: 1fr;
          grid-template-rows: 26px 70px 1fr;
        }

        .modal > div {
          display: grid;
          align-content: flex-start;
        } 

        .logo {
          height: 28px;
          width: auto;
        }

        .form-control label {
          display: block;
          text-transform: uppercase;
          font-weight: 200;
          color: #fff;
          opacity: 0.5;
          margin-bottom: 16px;
        }

        .selector {       
          width: 100%;
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 4px;
          padding: 4px 8px;
          box-sizing: border-box;
          height: 32px;
        }

        vaadin-tabs {
          box-shadow: none;
          border-bottom: 1px solid rgba(255,255,255, 0.5); 
        }

        vaadin-tab {
          color: #fff;
          font-weight: 300;
          font-size: 12px;
        }

        [part="label"] {
          color: #fff;
        }
      </style>
      <div class="modal">
        ${this.renderHeader()}
        ${this.renderDatePicker()}
        <div>
        <vaadin-tabs >
            <vaadin-tab>THREAD</vaadin-tab>
            <vaadin-tab>DIFF VIEW</vaadin-tab>
            <vaadin-tab>ASSETS</vaadin-tab>
          </vaadin-tabs>
          <iron-pages selected="${page}">
            <div><h3>Page 1</h3>Hello World</div>
            <div><h3>Page 2</h3>Hi All</div>
            <div><h3>Page 3</h3>Good Morning</div>            
          </iron-pages>          
          </div>
      </div>
    `;
  }

  _didRender() {
    const vaadinTab = this.shadowRoot.querySelector("vaadin-tabs");
    const ironPages = this.shadowRoot.querySelector("iron-pages");

    const config = { attributes: true };
    const callback = function(mutationsList) {
      for (var mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "selected"
        ) {
          ironPages.selected = mutation.target.selected;
        }
      }
    };
    var observer = new window.MutationObserver(callback);
    observer.observe(vaadinTab, config);
  }

  _activeChanged(newValue, oldValue) {
    console.log("value changed", newValue);
  }
}

window.customElements.define("df-action-menu", Modal);
