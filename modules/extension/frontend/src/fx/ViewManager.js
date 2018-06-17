export default class ViewManager {
  constructor(uuid) {
    // validate we are all using a shared instance
    this.uuid = uuid;
    this._elementsList = {};
  }

  get elementsList() {
    return this._elementsList;
  }

  _registerView(elementName, component) {
    window.customElements.define(elementName, component);
    this.elementsList[elementName] = component;
  }

  addView(elementName) {
    if (!this.elementsList[elementName]) {
      console.error(
        `[FX] Provided a view element name "${elementName}" that has not been registered. Call Fx.View first to register`
      );
      return;
    }

    const element = document.createElement(elementName);
    element.setAttribute("x-view-id", Math.floor(Math.random() * 1000));
    document.body.appendChild(element);
  }
}
