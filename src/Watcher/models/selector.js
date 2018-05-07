import { observable, computed, autorun } from "mobx";
import * as firebase from "firebase";
import pageUtils from "../location";

export default class Selector {
  @observable key = "";
  @observable annotations = [];

  constructor() {
    autorun(() => {
      console.log("Tasks left: " + this.key);
    });
  }

  static create(key, data) {
    const ref = firebase
      .database()
      .ref(`${pageUtils.domain}`)
      .child("selectors")
      .child(key);
    // this new, empty ref only exists locally
    var newChildRef = ref.set(data);
  }

  static fromSnapshot(snapshot) {
    const annotation = new Selector();
    annotation.key = snapshot.key;
    return annotation;
  }
}
