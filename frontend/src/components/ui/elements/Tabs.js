import { LitElement, html } from "@polymer/lit-element";
import DefaultTheme from "../theme/default";
import { component } from "core";

export default class Tabs extends DefaultTheme(LitElement) {
  _render() {
    return html`
        <style>
        .tabs {
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 10px;
          }
   
          ::slotted(a) {
            font-size: var(--font-sm);
            text-transform: uppercase;
            color: rgba(255,255,255,0.5);
            cursor: pointer;
            padding-bottom: 12px;
            margin: 0 8px;
            font-weight: 300;
          }

           ::slotted(a:first-child) {
            margin-left: 0px;
          }
   
          ::slotted(a.selected) {
            color: #fff;
            border-bottom: 2px solid #fff;
          }
        </style>
        <div class="tabs">
            <slot part="content"></slot>

        </div>
        
        
        
        `;
  }
}

component("df-tabs", Tabs);
