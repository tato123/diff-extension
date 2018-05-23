import { LitElement, html } from "@polymer/lit-element";
import img from "../resources/logo.png";

export default class Launcher extends LitElement {
  _render() {
    return html`
      <style>
      @keyframes appear {
        0% {
          opacity: 0;
          transform: translateY(var(--offset));
        }
        100% {
          opacity: 1;
          transform: translate(0px);
        }
      }
      :host {
        display: block;
        position: fixed;
        bottom: var(--offset);
        right: var(--offset);

        --blue: #191b3b;
        --pink: #e5397c;
        --offset: 64px;
      }

      .md-appear {
        animation: appear 250ms normal forwards cubic-bezier(0.55, 0, 0.1, 1);
      }

      .launcher {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: var(--blue);
        box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, 0.3);
        display: flex;
        flex: 1;
        cursor: pointer;
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
          Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }

      .launcher:hover {
        background-color: color(var(--blue) alpha(-10%));
      }

      .launcher img {
        width: 32px;
        height: 32px;
      }

      .launcher .logo {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
      }

      .number {
        background-color: var(--pink);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: white;
        justify-items: center;
        align-items: center;
        display: flex;
        font-weight: bold;
        position: absolute;
        right: -16px;
        flex: 1;
      }

      .number label {
        display: flex;
        flex: 1;
        justify-content: center;
      }
      </style>
      <div class="launcher">
          <div class="logo">
              <img src="${img}" />
          </div>
          <div class="number">
              <label>5</label>
          </div>
      </div>
    `;
  }

  _onClick() {
    console.log("Hey, I was clicked");
  }

  _firstRendered() {
    this.shadowRoot.querySelector(".launcher").classList.add("md-appear");
  }
}

window.customElements.define("df-launcher", Launcher);
