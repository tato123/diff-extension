import { observable, computed, reaction, autorun, action, spy } from "mobx";
import { log } from "./log";
import selector from "./models/selector";
import { renderSelectors } from "./ui";
import Store from "./models/store";

export default class Watcher {
  @observable store;

  constructor() {
    this.store = new Store();
  }

  start() {
    console.log("---------------------");
    console.log("Starting watcher");
    console.log("---------------------");

    autorun(() => console.log(this.store.selectors.toJSON()));
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

  @action
  addSelector(key, metadata) {
    selector.create(key, metadata);
  }
}

// select(selector, type) {
//   const element = document.querySelector(selector);
//   console.log("selecting", selector, element);
//   const styles = readStyles([element])[0]
//     .map(
//       rule => `<div><pre><code class="css">${rule.cssText}</code></pre></div>`
//     )
//     .join("");
//   if (element) {
//     Components[type](element);
//     addNotes(
//       element,
//       cssbeautify(styles, {
//         indent: "  ",
//         openbrace: "separate-line",
//         autosemicolon: true
//       })
//     );
//   }
// }
