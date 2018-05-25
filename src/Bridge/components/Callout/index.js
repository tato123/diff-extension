import { LitElement, html } from "@polymer/lit-element";
import theme from "../Theme";
import Popper from "popper.js";

import "../Modal";

export default class Callout extends LitElement {
  _render({ count }) {
    return html`
    ${theme}
      <style>
        .callout {
            width: 32px;
            height: 32px;
            background:#e63a7d;
            border-radius: 50%;
            display: flex;
        }
        label {
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            align-items: center;
            justify-content: center;
            display: flex;
            flex: 1;
        }

        .box-region {
            width: 480px;
            height: 64px;
            border-radius: 32px;
            border: 4px dashed #8c8da0;
            opacity: 0;
            display: block;
            position: absolute;
            top: -15px;
            left: 20px;
            cursor: pointer;
            z-index: -1;
            transition: all 75ms ease-in;
        }

        .appear {
            opacity: 1;
        }

        .selected {
          border-color: #1e1e3e;
          opacity: 1;
        }
      </style>
      <div class="callout" 
        onmouseover="${() => this._mouseOver()}" 
        onmouseleave="${() => this._mouseLeave()}"
        onclick="${() => this._onClick()}"
        >
         <label>${count}</label>
         <div class="box-region"></div>
      </div>
    `;
  }

  static get properties() {
    return {
      count: Number,
      element: String
    };
  }

  get boxRegionRef() {
    return this.shadowRoot.querySelector(".box-region");
  }

  get targetElement() {
    return document.querySelector(this.element);
  }

  _didRender({ element }, changedProps) {
    if (element) {
      this.popper = new Popper(this.targetElement, this, {
        placement: "left-start"
      });
    }
  }

  _mouseOver() {
    this.boxRegionRef.classList.add("appear");
  }

  _mouseLeave() {
    this.boxRegionRef.classList.remove("appear");
  }

  _onClick() {
    if (this.modal) {
      document.querySelector("df-action-menu").remove();
      this.modal = false;
      this.boxRegionRef.classList.remove("selected");
    } else {
      this.boxRegionRef.classList.add("selected");
      const actionMenu = document.createElement("df-action-menu");
      document.body.appendChild(actionMenu);
      this.modal = true;
    }
  }
}

window.customElements.define("df-callout", Callout);
