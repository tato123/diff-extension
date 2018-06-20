import { LitElement, html } from "@polymer/lit-element";

export default class PopperOutline extends LitElement {
  _render() {
    return html`
        <style>
        :host {
          border: 4px dashed #8c8da0;
          width: 0;
          height: 0;
          position: absolute;
          border-radius: 20px;
          opacity: 0;
          cursor: pointer;
          z-index: 0;
        }
        
        :host(:hover) {
          border-color: #1e1e3e99;
        }


        :host(.selected) {
          border-color: #1e1e3e;
          z-index: 2;
        }
        
        </style>
      `;
  }
}
