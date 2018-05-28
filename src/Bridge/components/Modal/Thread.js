import { LitElement, html } from "@polymer/lit-element";
import format from "date-fns/format";
import { threadForIdSelector } from "Bridge/selectors/selector";

import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";

export default class ThreadView extends connect(store)(LitElement) {
  _render({ items }) {
    if (!items) {
      return html``;
    }
    return html`
      <style>
        .thread-container:last-child {
            box-shadow: none;
        }
      </style>
      <div class="modal">        
        ${items.map(item => {
          if (item.type === "comment") {
            return this._renderComment(item);
          }
        })}
      </div>
    `;
  }

  static get properties() {
    return {
      threadId: String,
      items: Array
    };
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
                <span>${item.comment}</span>
            </div>
        </div>

      `;
  }

  _stateChanged(state) {
    if (state) {
      this.items = threadForIdSelector(this.threadId)(state);
    }
  }
}
