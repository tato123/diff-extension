import { html } from "@polymer/lit-element";

const ThemedMixin = theme => superClass => {
  return class extends superClass {
    constructor() {
      super();
      this._wrappedRender = this._render;
      this._render = props => {
        return html`            
            ${this._wrappedRender(Object.assign({}, props, { theme }))}
          `;
      };
    }
  };
};

export default ThemedMixin;
