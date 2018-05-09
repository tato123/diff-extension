import { observable, computed, autorun } from "mobx";
import * as firebase from "firebase";
import pageUtils from "../location";

export default class Persitable {
  static create(key, data) {
    const ref = firebase
      .database()
      .ref(`${pageUtils.domain}`)
      .child(this.storageKey())
      .child(key);
    // this new, empty ref only exists locally
    var newChildRef = ref.set(data);
  }

  static fromSnapshot(snapshot) {
    const annotation = new Selector();
    annotation.key = snapshot.key;
    return annotation;
  }

  static storageKey() {
    throw new Error("Storage key not defined");
  }
}
