import { component } from "core";

import { LitElement, html } from "@polymer/lit-element";
import DefaultTheme from "../theme/default";

export default class DateSelector extends DefaultTheme(LitElement) {
  _render() {
    return html`
      <style>
        .label {
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;  
          color: #fff;   
          font-size: 12px;
        }

        .dropdown {
          border: 1px solid var(--white);
          text-transform: uppercase;
          border-radius: 4px;
          padding: 8px;
          font-size: 14px;
          color: #fff;   
          cursor: pointer;
        }

        .dropdown:hover {
          background-color: var(--white-2);
        }

        df-icon {
          float: right;
        }
      </style>
      <div >
        <label class="label">
          Date Range
         
        </label>
        <div class="dropdown">
           <label>Since last visit</label>
           <df-icon icon="chevron-down"></df-icon>
        </div>
      </div>

    `;
  }
}

component("df-date-select", DateSelector);
