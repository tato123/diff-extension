import { observable, action } from "mobx";
import Persistable from "./persitable";
import pageUtils from "../location";
import * as firebase from "firebase";

export default class Selector {
  @observable selector = null;
  @observable annotationIds = [];
  @observable metadata = {};

  firebaseRef = null;

  storageKey = "selectors";

  @action.bound
  save() {
    if (this.firebaseRef) {
      return this.firebaseRef.update(this.toFirebaseJs());
    }

    const ref = firebase
      .database()
      .ref(`${pageUtils.domain}`)
      .child(this.storageKey);

    // this new, empty ref only exists locally
    var newChildRef = (this.firebaseRef = ref.push());

    //
    newChildRef.set(this.toFirebaseJs());
  }

  merge(values) {
    // change to only accept a whitelist
    Object.assign(this, values);
  }

  toFirebaseJs() {
    return {
      selector: this.selector,
      annotationIds: this.annotationIds,
      metadata: this.metadata
    };
  }
}

class SelectorStore {
  @observable selectors = observable.map();

  @action
  fetchSelectors() {}

  @action
  upsertSelector() {
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
  }
}
