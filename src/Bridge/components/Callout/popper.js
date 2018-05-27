import { LitElement, html } from "@polymer/lit-element";
import theme from "../Theme";
import Popper from "popper.js";

export default class Callout extends LitElement {
  _render({ count }) {
    return html`
    ${theme}
      <style>

        :host {
          opacity: 0;
        }
        .callout {
          position: relative;
          
        }
        label {
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            align-items: center;
            justify-content: center;
            display: flex;
            flex: 1;
            background:#e63a7d;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            opacity: 1;
            position: absolute;
            left: -16px;
            top: -16px;
        }

        .box-region {
            opacity:0;
            border-radius: 32px;
            border: 4px dashed #8c8da0;
            display: block;
            cursor: pointer;
            z-index: -1;
            transition: all 100ms ease-in;
        }

        .appear {
            opacity: 1;
        }

        .selected {
          border-color: #1e1e3e;
          opacity: 1;
        }

        .box-region:hover {
          opacity: 1;
        }
      </style>
      <div class="callout"         
        onclick="${this._onClick}"
        >
         <label>${count}</label>
         <div class="box-region"></div>
      </div>

     
    `;
  }

  static get properties() {
    return {
      count: Number,
      element: String,
      delay: Number,
      duration: Number
    };
  }

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  get boxRegionRef() {
    return this.shadowRoot.querySelector(".box-region");
  }

  get targetElement() {
    return document.querySelector(this.element);
  }

  get poplabel() {
    return this.shadowRoot.querySelector("label");
  }

  get timings() {
    return {
      easing: "cubic-bezier(0.2, 0.0, 0.2, 1)",
      fill: "forwards",
      duration: this.duration,
      delay: this.delay
    };
  }

  _didRender() {
    if (this.targetElement && !this.popper) {
      this.targetElement.addEventListener("mouseover", () => {
        this.boxRegionRef.style.opacity = 1;
      });

      this.targetElement.addEventListener("mouseleave", () => {
        this.boxRegionRef.style.opacity = 0;
      });

      this.popper = new Popper(this.targetElement, this, {
        placement: "left-start",
        onCreate: data => {
          this.updateOutline(data);
          this.animateEnter(data);
        },
        onUpdate: this.updateOutline
      });
    }
  }

  animateEnter(data) {
    this.animate([{ opacity: 0 }, { opacity: 1 }], this.timings);
  }

  updateOutline(data) {
    /* eslint-disable */
    if (this.targetElement) {
      const width = window.getComputedStyle(this.targetElement, null).width;
      const height = window.getComputedStyle(this.targetElement, null).height;

      // modify box-region
      this.boxRegionRef.style.width = width;
      this.boxRegionRef.style.height = height;
      this.boxRegionRef.style.top = "0";
    }
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

window.customElements.define("df-popper", Callout);
