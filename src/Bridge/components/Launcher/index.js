import { LitElement, html } from "@polymer/lit-element";
import img from "../resources/logo.png";
import "ui/diff";

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
        --blue-2: #191b3bef;
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
        background-color: var(--blue-2);
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
        color: white;
        display: flex;
        position: absolute;
        right: 16px;
        flex: 1;
      }

      [x-unfocus] {
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        outline: none;
      }

      </style>
      <div class="launcher">
          <div class="logo" x-unfocus>
              <img src="${img}" x-unfocus/>
          </div>
          <df-bubble value="5" class="number" x-unfocus />
      </div>
    `;
  }

  get launcher() {
    return this.shadowRoot.querySelector(".launcher");
  }

  _firstRendered() {
    this.launcher.classList.add("md-appear");
  }
}

window.customElements.define("df-launcher", Launcher);
