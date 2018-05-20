const template = document.createElement("template");
template.innerHTML = `
      <style>
        :host {
          display: inline-block;
          background: url('unchecked-checkbox.svg') no-repeat;
          background-size: contain;
          width: 24px;
          height: 24px;
        }
        :host([hidden]) {
          display: none;
        }
        :host([checked]) {
          background: url('checked-checkbox.svg') no-repeat;
          background-size: contain;
        }
        :host([disabled]) {
          background:
            url('unchecked-checkbox-disabled.svg') no-repeat;
          background-size: contain;
        }
        :host([checked][disabled]) {
          background:
            url('checked-checkbox-disabled.svg') no-repeat;
          background-size: contain;
        }
      </style>
    `;

export default class HowToCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (!this.hasAttribute("role")) this.setAttribute("role", "checkbox");
    if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", 0);

    this._upgradeProperty("checked");
    this._upgradeProperty("disabled");

    this.addEventListener("keyup", this._onKeyUp);
    this.addEventListener("click", this._onClick);
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  disconnectedCallback() {
    this.removeEventListener("keyup", this._onKeyUp);
    this.removeEventListener("click", this._onClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const hasValue = newValue !== null;
    switch (name) {
      case "checked":
        this.setAttribute("aria-checked", hasValue);
        break;
      case "disabled":
        this.setAttribute("aria-disabled", hasValue);
        if (hasValue) {
          this.removeAttribute("tabindex");
          this.blur();
        } else {
          this.setAttribute("tabindex", "0");
        }
        break;
    }
  }

  _onClick(event) {
    console.log("Clicked");
  }
}
