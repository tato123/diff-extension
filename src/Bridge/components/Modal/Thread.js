import { LitElement, html } from "@polymer/lit-element";
import format from "date-fns/format";
import { threadForIdSelector } from "Bridge/selectors/selector";

import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../store.js";

import { threadIdSelector } from "Bridge/selectors/location";

import logo from "Bridge/components/resources/logo.png";

export default class ThreadView extends connect(store)(LitElement) {
  _render({ items }) {
    if (!items) {
      return html``;
    }
    return html`
      <style>
        :host {
            --white: #fff;
            --white-2: rgba(255,255,255, 0.5);
            --white-3: rgba(255,255,255, 0.3);


            display: flex;
            flex-direction: column;
            flex: 1;
            overflow: auto;
        }

        .thread-container:last-child {
            box-shadow: none;
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
            font-size: 12px;
            color: var(--white);
        }
       

        .avatar {
          border-radius: 50%;
        }

        .thread-icon {
          width: 20px;
          height: 20px;
        }

        .spacing-bottom {
          margin-bottom: 12px;
          box-sizing: border-box;
          padding: 0;
          line-height: 1;
        }

        .thread-container .header {
            text-transform: uppercase;
            display: block;
            font-size: 14px;
            color: var(--white);
        }

        .dateTime {
            color: var(--white-2);
            font-size: 10px;
        }

        .comment span:nth-child(3) {
            color: var(--white);
            font-size: 12px;
        }
        .diff-type {
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 300;
        }

        .diff-preview {
          display: flex;
          font-family: 'Roboto Mono', monospace;
          margin-left: 4px;
          
        }

        .diff-preview span.from{
          color: #22B573; 
          font-size: 14px;
          text-transform: none;
        }  

        .diff-preview span.to {
          color: #EF3B7B;
          font-size: 14px;
          text-transform: none;
        }
        
        .placeholder-image {
          background-color: #ccc;
        }

      </style>
      <div class="modal">        
        ${items.map(item => {
          if (item.type === "comment") {
            return this._renderComment(item);
          } else if (item.type === "diff") {
            return this._renderDiff(item);
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

  formatDate(date) {
    return format(date, "dddd, MMM D, YYYY - hh:mm A");
  }

  _renderDiff(item) {
    return html`
      <div class="thread-container diff">
            <div class="gutter">
                <img src="${logo}" class="thread-icon"/>
            </div>
            <div class="thread">    
                <div class="spacing-bottom">     
                  <span class="header">DIFF</span>
                  <span class="dateTime">${this.formatDate(
                    item.ts.toDate()
                  )}</span>
                </div>
                <span class="diff-type">${item.diffType}</span>
                <div class="diff-preview">
                  <span class="from">${item.diff.from}</span>
                  <span class="to">${item.diff.to}</span>
                </div>
            </div>
      </div>
    `;
  }

  _renderComment(item) {
    return html`     
        <div class="thread-container comment">
            <div class="gutter">
                ${
                  item.avatar
                    ? html` <img class="thread-icon avatar" src="${
                        item.avatar
                      }"/>`
                    : html`<div class="placeholder-image thread-icon avatar"/>`
                }
               
            </div>
            <div class="thread">     
                <div class="spacing-bottom">
                  <span class="header">COMMENT</span>
                  <span class="dateTime">${this.formatDate(
                    item.ts.toDate()
                  )}</span>
                </div>
                <span>${item.comment}</span>
            </div>
        </div>

      `;
  }

  _stateChanged(state) {
    if (state) {
      this.threadId = threadIdSelector(state);
      this.items = threadForIdSelector(this.threadId)(state);
    }
  }
}
