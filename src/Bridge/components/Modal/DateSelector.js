import { LitElement, html } from "@polymer/lit-element";

class DateSelector extends LitElement {
  _render() {
    return html`
      <style>
        :host {
          --white: #fff;
          --white-2: rgba(255,255,255,0.5);
          --white-3: rgba(255,255,255,0.1);
        }

        .label {
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;  
          color: var(--white-2);
          font-size: 12px;

        }

        .dropdown {
          border: 1px solid var(--white-3);
          text-transform: uppercase;
          border-radius: 4px;
          padding: 8px;
          font-size: 14px;
          color: var(--white);
          cursor: pointer;
          transition: all 150ms ease-in;
        }

        .dropdown:hover {
          background-color: var(--white-3);
        }


      </style>
      <div >
        <label class="label">Date Range</label>
        <div class="dropdown">
          Since last visit
        </div>
      </div>

    `;
  }
}
window.customElements.define("df-modal-dateselector", DateSelector);
