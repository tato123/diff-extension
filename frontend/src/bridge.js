import { connect } from "./firebase";
import { subscribe } from "./messagebus";
import "./app";

export default class Bridge {
  constructor() {
    // create our observable store
    this.firebaseRef = connect();
    subscribe(this.onEvent);
  }

  start() {
    console.log("---------------------");
    console.log("Starting watcher");
    console.log("---------------------");
    document.body.insertAdjacentHTML("beforeend", `<df-app />`);
    return this;
  }

  onEvent(data) {
    // console.log("[Bridge received]", data);
  }

  debug() {
    console.log("---------------------");
    console.log("Debugging watcher");
    console.log("---------------------");
    this.debug = true;
    return this;
  }

  static init() {
    if (window.diffApp) {
      console.error("watcher already initailized");
      return window.diffApp;
    }

    return (window.diffApp = new Bridge());
  }

  static getInstance() {
    return window.diffApp;
  }
}
