import { observable, computed, reaction, autorun, action, spy } from "mobx";
import { log } from "./log";
import selector from "./models/selector";
import renderUI from "./ui";
import Store from "./models/store";

export default class Watcher {
  @observable store;

  constructor() {
    // create our observable store
    this.store = new Store();
  }

  start() {
    console.log("---------------------");
    console.log("Starting watcher");
    console.log("---------------------");
    renderUI(this.store);
    return this;
  }

  debug() {
    console.log("---------------------");
    console.log("Debugging watcher");
    console.log("---------------------");
    this.debug = true;
    return this;
  }

  static init() {
    if (window.watcher) {
      console.error("watcher already initailized");
      return window.watcher;
    }

    const watcher = (window.watcher = new Watcher());
    return watcher;
  }

  static getInstance() {
    return window.watcher;
  }
}
