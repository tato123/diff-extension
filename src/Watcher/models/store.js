import { observable, createAtom, set, autorun, action } from "mobx";
import pageLocation from "../location";
import { log } from "../log";
import * as firebase from "firebase";

import Selector from "./selector";
import Annotation from "./annotation";
import Page from "./page";

export default class Store {
  @observable selectors = observable.map();
  @observable annotations = observable.map();
  atom;

  // API Actions that can be invoked directly from
  // the console or from the watcher
  actions = {
    upsertSelector: (selectorKey, values) => {
      // first try to see if we have a selector that matches
      if (this.selectors.has(selectorKey)) {
        console.log("found value");
        const selector = this.selectors.get(selectorKey);
        selector.merge(values);
        return selector.save();
      }

      // if we don't have a value
      console.log("inserting new value");
      const selector = new Selector();
      selector.merge({ ...values, selector: selectorKey });
      selector.save();
    },
    addAnnotation: (...args) => Annotation.create(...args),
    addPage: (...args) => Page.create(...args)
  };

  constructor() {
    this.atom = createAtom("Store");
    this.connect();
  }

  // --------------------------------------------------------
  // From firebase
  // --------------------------------------------------------

  debugLog = snapshot => {
    if (snapshot && snapshot.val)
      log(
        "[Watcher - firebase] received new value",
        snapshot.key,
        snapshot.val()
      );
  };

  observeRemoteVal = key => {
    const selectorRef = firebase
      .database()
      .ref(`${pageLocation.domain}/${key}`);
    selectorRef.on("value", snapshot => {
      this.debugLog(snapshot);
      if (snapshot) {
        this[key].merge(snapshot.val());
      }
    });
  };

  connect() {
    log("Connecting");
    const config = {
      apiKey: "AIzaSyDtroOByHljc1s8YyTDtek1J0h9lgHTLgM",
      authDomain: "pixellab-203301.firebaseapp.com",
      databaseURL: "https://pixellab-203301.firebaseio.com",
      projectId: "pixellab-203301",
      storageBucket: "pixellab-203301.appspot.com",
      messagingSenderId: "43131944302"
    };
    firebase.initializeApp(config);

    this.observeRemoteVal("selectors");
    this.observeRemoteVal("annotations");
  }
}
