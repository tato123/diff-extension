import { LitElement, html } from "@polymer/lit-element";
import DefaultTheme from "./theme/default";

export default class Bubble extends DefaultTheme(LitElement) {
  _render({ theme, value, loading = false }) {
    return html`
        <style>
            div {
                color: #fff;
                font-size: 14px;
                font-weight: bold;
                align-items: center;
                justify-content: center;
                display: flex;
                flex: 1;
                background: #e63a7d;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                opacity: 1;
                position: absolute;
                left: -16px;
                top: -16px;
            }
            
        </style>
        <div>
            ${
              loading ? html`<df-icon icon="spinner" class="fa-spin" />` : value
            }
            
            
        </div>
      `;
  }

  static get properties() {
    return {
      value: String,
      loading: Boolean
    };
  }
}
