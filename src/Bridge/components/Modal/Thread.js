import { LitElement, html } from "@polymer/lit-element";
import theme from "../Theme";
import placeholder from "./profilepic.png";
import format from "date-fns/format";

class ModalThread extends LitElement {
  constructor() {
    super();
    this.items = [
      {
        date: Date.now(),
        type: "comment",
        val: `“Looking good! One small change. 
        The border radius should be 3px. The 
        JIRA story is linked.”`,
        pic: placeholder
      },
      {
        date: Date.now(),
        type: "comment",
        val: `“Looking good! One small change. 
        The border radius should be 3px. The 
        JIRA story is linked.”`,
        pic: placeholder
      },
      {
        date: Date.now(),
        type: "comment",
        val: `“Looking good! One small change. 
        The border radius should be 3px. The 
        JIRA story is linked.”`,
        pic: placeholder
      }
    ];
  }

  _renderComment(item) {
    var date = format(item.date, "dddd, MMM D, YYYY - hh:mm A");
    return html`
        <style>
            :host {
                --white: #fff;
                --white-2: rgba(255,255,255, 0.5);
                --white-3: rgba(255,255,255, 0.3);
            }

            .thread-container {
                display: grid;
                grid-template-areas: ". .";
                grid-template-columns: 20px 1fr;
                grid-column-gap: 12px;
                padding: 20px 0;
                box-shadow: inset 0 -1px 0 0 var(--white-3);
            }

            .thread {
                display: flex;
                flex-direction: column;
                width: 100%;
            }
            .thread span:first-child {
                text-transform: uppercase;
                display: block;
                font-size: 14px;
                color: var(--white);
                margin-bottom: 6px;
            }

            .thread span:nth-child(2) {
                color: var(--white-2);
                font-size: 10px;
                margin-bottom: 16px;
            }

            .thread span:nth-child(3) {
                color: var(--white);
                font-size: 12px;
            }
        </style>
        <div class="thread-container">
            <div class="gutter">
                <img src="${item.pic}"/>
            </div>
            <div class="comment thread">
                <span>COMMENT</span>
                <span>${date}</span>
                <span>${item.val}</span>
            </div>
        </div>

      `;
  }

  _render({ page }) {
    return html`
      ${theme}
      <style>
        .thread-container:last-child {
            box-shadow: none;
        }
      </style>
      <div class="modal">
        ${this.items.map(item => {
          if (item.type === "comment") {
            return this._renderComment(item);
          }
        })}
      </div>
    `;
  }
}

window.customElements.define("df-modal-thread", ModalThread);
