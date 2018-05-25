import { LitElement, html } from "@polymer/lit-element";
import theme from "../Theme";
import "./diff-logo";
import "@polymer/iron-pages";
import "./Thread";
import "./DateSelector";

export default class Modal extends LitElement {
  renderDatePicker() {
    return html`
      <df-modal-dateselector />
    `;
  }

  renderHeader() {
    return html`
        <div>
          <df-logo />
          </div>
    `;
  }

  renderPlaceholder() {
    return html`
      <style>
        .placeholder {
          height: 100%;
          width: 100%;
          display: grid;
          margin-top: 200px;
          text-align: center;
          color: #fff;
          font-weight: 300;
          padding: 0 20px;
        }
      </style>
      <div class="placeholder">        
        Looks like we've got no content here!        
      </div>
    `;
  }

  renderContent() {
    return html`
    <style>
       .tabs {
         border-bottom: 1px solid rgba(255,255,255,0.1);
         padding-bottom: 10px;
       }

       .tabs a {
         font-size: 10px;
         text-transform: uppercase;
         color: rgba(255,255,255,0.5);
         cursor: pointer;
         padding-bottom: 10px;
         margin: 0 8px;
       }

       .tabs a:first-child {
         margin-left: 0px;
       }

       .tabs a.selected {
         color: #fff;
         border-bottom: 1px solid #fff;
       }
        
    </style>
    <div>
      <div class="tabs">
        <a on-click="${() => this._selectTab(0)}">Thread</a>
        <a on-click="${() => this._selectTab(1)}">Diff View</a>
        <a on-click="${() => this._selectTab(2)}">Assets</a>          
      </div>
        <iron-pages selected="0">
          <div>
            <df-modal-thread />
          </div>
          <div>${this.renderPlaceholder()}</div>
          <div>${this.renderPlaceholder()}</div>            
        </iron-pages>          
        </div>
    `;
  }

  _selectTab(selection) {
    const ironPages = this.shadowRoot.querySelector("iron-pages");
    ironPages.selected = selection;
    this.shadowRoot.querySelectorAll(".tabs > a").forEach((a, idx) => {
      if (idx === selection) {
        a.classList.add("selected");
      } else {
        a.classList.remove("selected");
      }
    });
  }

  _didRender() {
    this._selectTab(0);
  }

  _render({ page }) {
    return html`
      ${theme}
      <style>
        .modal {          
          width: 340px;
          height: 627px;
          background: linear-gradient(to right, #171A3A , #221F41);
          position: absolute;
          top: 32px;
          left: 500px;
          border-radius: 8px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
          padding: 36px;
          display: grid;
          grid-row-gap: 26px;
          grid-template-columns: 1fr;
          grid-template-rows: 26px 45px 1fr;
        }

        .modal > div {
          display: grid;
          align-content: flex-start;
        } 

        .logo {
          height: 28px;
          width: auto;
        }

        .form-control label {
          display: block;
          text-transform: uppercase;
          font-weight: 200;
          color: #fff;
          opacity: 0.5;
          margin-bottom: 16px;
        }

        .selector {       
          width: 100%;
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 4px;
          padding: 4px 8px;
          box-sizing: border-box;
          height: 32px;
        }

        
      </style>
      <div class="modal">
        ${this.renderHeader()}
        ${this.renderDatePicker()}
        ${this.renderContent()}
      </div>
    `;
  }
}

window.customElements.define("df-action-menu", Modal);
