import ViewManager from "./ViewManager";

const VERSION = "0.0.1";
let ApplicationInstance;

const ViewManagerInstance = new ViewManager();

export default class Fx {
  constructor(version) {
    this.version = version;
  }

  get self() {
    return ApplicationInstance;
  }

  set viewManager(viewManager) {
    if (!this.viewManager) {
      this._viewManager = viewManager;
    } else {
      console.warn("View manager already instanciated");
    }
  }

  get viewManager() {
    return this._viewManager;
  }

  static app() {
    return ApplicationInstance;
  }

  static view(name, component) {
    ViewManagerInstance._registerView(name, component);
  }

  static bootstrapApplication() {
    if (!ApplicationInstance) {
      ApplicationInstance = new Fx(VERSION);

      // create a new view manawger
      Fx.app.viewManager = ViewManagerInstance;
    }

    return Promise.resolve(Fx.app.viewManager);
  }
}
