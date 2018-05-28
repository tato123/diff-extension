import { LitElement, html } from "@polymer/lit-element";
import DefaultTheme from "./theme/default";

export default class Button extends DefaultTheme(LitElement) {
  _render({ icon }) {
    return html`
        <style>            
            

            [part="button"] {
              background: none;
              outline: none;
              border: 1px solid var(--white);
              color: #fff;            
              padding: 8px;
              cursor: pointer;
              border-radius: 8px;
              font-weight: var(--font-thin);
            }

            [part="button"]:hover {
              background-color: var(--white-2);
            }  

            df-icon {
              margin-right: 8px;
              font-size: var(--font-sm);
            }
      </style>  
        <button part="button">
            ${icon && html`<df-icon icon=${icon}></df-icon>`}
            <slot></slot>
        </button>
      `;
  }

  constructor() {
    super();
    this.color = "blue";
  }

  static get properties() {
    return {
      icon: String
    };
  }
}
