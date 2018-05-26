import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

import fontawesome from "@fortawesome/fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import regular from "@fortawesome/fontawesome-free-regular";
import brands from "@fortawesome/fontawesome-free-brands";

fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);

export default class Icon extends PolymerElement {
  // Define optional shadow DOM template
  static get template() {
    return html`
      <style id="placeholder"></style>
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

  constructor() {
    super();

    afterNextRender(this, function() {
      this.$.placeholder.innerHTML = fontawesome.dom.css();
    });
  }
}
