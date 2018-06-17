import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { component } from "core";

import fontawesome from "@fortawesome/fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import regular from "@fortawesome/fontawesome-free-regular";
import brands from "@fortawesome/fontawesome-free-brands";

export default class Icon extends PolymerElement {
  // Define optional shadow DOM template
  static get template() {
    return html`   
      <span id="icon"></span>
    `;
  }

  // Declare properties for the element's public API
  static get properties() {
    return {
      icon: {
        type: String,
        observer: "_iconNameChanged"
      }
    };
  }

  _iconNameChanged(a) {
    this.$.icon.innerHTML = fontawesome.icon({
      prefix: "fas",
      iconName: a
    }).html;
  }

  _attachDom(dom) {
    this.appendChild(dom);
  }

  ready() {
    super.ready();

    fontawesome.library.add(solid);
    fontawesome.library.add(regular);
    fontawesome.library.add(brands);
    const css = fontawesome.dom.css();

    const style = document.createElement("style");
    style.innerHTML = css;
    this.appendChild(style);
  }
}

component("df-icon", Icon);
