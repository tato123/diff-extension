import { LitElement, html } from "@polymer/lit-element";
import "components/resources/diff-logo";
import "@polymer/iron-pages";

import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";

import { threadIdSelector } from "selectors/location";

export default class Window extends connect(store)(LitElement) {
  _render({ threadId }) {
    return html`
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
          padding: 24px;
          display: grid;
          grid-row-gap: 26px;
          grid-template-columns: 1fr;
          grid-template-rows: 26px 65px;
          z-index: 999999999;
          box-sizing: border-box;
          overflow: hidden;
        }

        .modal > div {
          display: grid;
          align-content: flex-start;
        } 

        iron-pages, .iron-selected, .full-height {
          display: flex !important;
          flex-direction: column;
          flex: 1;
          overflow: auto;
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
        }

        .selector {       
          width: 100%;
          border: 1px solid rgba(255,255,255,0.5);
          border-radius: 4px;
          padding: 4px 8px;
          box-sizing: border-box;
          height: 32px;
        }

        iron-pages > div {
          margin: 16px 0px;
        }
      </style>
      <div class="modal">
        <div>
          
          <df-logo></df-logo>
        </div>
        <df-date-select></df-date-select>
        <div class="full-height">
          <df-tabs>
            <a on-click="${() => this._selectTab(0)}">Thread</a>
            <a on-click="${() => this._selectTab(1)}">Diff View</a>
            <a on-click="${() => this._selectTab(2)}">Assets</a>          
          </df-tabs>
            <iron-pages selected="0">
              <div>
                ${this.renderForm()}
                <df-thread-view threadId="${this.threadId}"/>
              </div>
              <div>${this.renderPlaceholder()}</div>
              <div>${this.renderPlaceholder()}</div>            
            </iron-pages>          
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      threadId: String,
      isAdding: Boolean
    };
  }

  renderForm() {
    if (this.isAdding) {
      return html`
        <style>
          .thread-container {
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }

          .thread-form {
            display: grid;
            grid-template-areas: "." "." ".";
            grid-template-rows: 132px 16px 40px;
            grid-row-gap: 16px;
            
              
          }

           .thread-form .textarea-container {
              width: 100%;
              height: 134px;
              border-radius: 8px;
              padding: 8px;
              background: #fff;
              box-sizing: border-box; 
              padding-right: 0;
           } 

           .textarea-container textarea {
              background: transparent;
              overflow-y: auto;
              overflow-x: none;
              width: 100%;
              height: 100%;
              resize: none;
              box-sizing: border-box;
              border: none;
              outline: none;
           }

           .thread-form a, 
           .thread-form label,
           .thread-form .button {
             color: #fff;
           }

           .form-control.groups {
             display: flex;
           }
           
           .left-group, .right-group {
             display: flex;
             align-items: center;
           }

           .groups .left-group {
             width: 50px;
           }
           .groups .right-group {
             flex: 1;
             justify-content: flex-end;
           }

           .thread-form .button {
             padding: 8px;
             border: 1px solid rgba(255,255,255,0.1);
             border-radius: 4px;
             margin: 0 4px;
             background: transparent;
             cursor: pointer;
             max-height: 32px;
              min-height: 32px;
              height: 32px;
              display: flex;
              box-sizing: border-box;
              align-items: center;
              font-size: 14px;
           }

           .thread-form .button:hover {
             background-color: rgba(255,255,255,0.3);
           }

           .thread-form .button:active,
           .thread-form .button:focus {
             outline: none;
           }

           .thread-form a {
             cursor: pointer;
           }

           .hint {
             font-size: 12px;
           }
        </style>  
        <div class="thread-container">
          <form class="thread-form" onsubmit="${this.submitForm}">
            <div class="form-control">
              <div class="textarea-container">
              <textarea name="comment"></textarea>
              </div>
            </div>
            <div class="form-control">
              <label class="hint">No attachments</label>
            </div>
            <div class="form-control groups">
              <div class="left-group">
              
              <a on-click="${() => (this.isAdding = false)}">cancel</a>
              </div>
              <div class="right-group">
              <a class=button>
                <df-icon icon="paperclip"></df-icon>
              </a>
              <a class=button>
                <df-icon icon="search"></df-icon>
              </a>
              <input type="submit" class=button value="POST">              
              </div>
            </div>
          </form>
        </div>
      `;
    } else {
      return html`
        <style>
          df-button {
            display: flex;
            justify-content: center;
          }
        </style>
        <df-button icon="plus" on-click="${() =>
          (this.isAdding = true)}">ADD COMMENT</df-button>
      `;
    }
  }

  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(evt) {
    evt.preventDefault();
    console.log(evt.target.comment.value);

    return false;
  }

  renderPlaceholder() {
    return html`
      <style>
        .placeholder {
          flex: 1;
          display: flex;
          text-align: center;
          color: #fff;
          font-weight: 300;
          padding: 0 20px;
          font-size: 1rem;
        }
      </style>
      <div class="placeholder">        
        Looks like we've got no content here!        
      </div>
    `;
  }

  _selectTab(selection) {
    const ironPages = this.shadowRoot.querySelector("iron-pages");
    ironPages.selected = selection;
    this.shadowRoot.querySelectorAll("df-tabs > a").forEach((a, idx) => {
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

  _stateChanged(state) {
    if (state) {
      this.threadId = threadIdSelector(state);
    }
  }
}
