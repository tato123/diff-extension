import { observable, createAtom, set, autorun, action } from "mobx";
import pageLocation from "../location";
import { log } from "../log";
import * as firebase from "firebase";
import Selector from "./selector";
import Annotation from "./annotation";

const debugLog = snapshot => {
  if (snapshot && snapshot.val)
    log(
      "[Watcher - firebase] received new value",
      snapshot.key,
      snapshot.val()
    );
};

export default class Store {
  @observable selectors = observable.map();
  @observable annotations = observable.map();
  atom;

  constructor() {
    this.atom = createAtom("Store");
    this.connect();
  }

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

    this.observeSelectors();
    this.observeAnnotations();

    const selectorRef = firebase
      .database()
      .ref(`${pageLocation.domain}/selectors`);
    selectorRef.on("value", this.observeSelectors);

    const annotationRef = firebase
      .database()
      .ref(`${pageLocation.domain}/annotations`);
    annotationRef.on("value", this.observeAnnotations);
  }

  observeSelectors = selectors => {
    if (selectors) {
      debugLog(selectors);
      this.selectors.merge(selectors.val());
      this.atom.reportChanged();
    }
  };

  observeAnnotations = annotations => {
    if (annotations) {
      debugLog(annotations);
      this.annotations.merge(annotations.val());
      this.atom.reportChanged();
    }
  };
}
