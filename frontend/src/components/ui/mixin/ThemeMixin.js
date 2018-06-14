import { html } from "@polymer/lit-element";

const ThemedMixin = theme => baseElement =>
  class extends baseElement {
    constructor() {
      super();
      this._wrappedRender = this._render;
      this._render = props => {
        return html`
            ${theme}
            ${this._wrappedRender({ ...this, ...props, theme })}
          `;
      };
    }
  };
export default ThemedMixin;
