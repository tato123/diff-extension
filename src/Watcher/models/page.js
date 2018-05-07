import { observable, computed } from "mobx";
import * as firebase from "firebase";
import pageUtils from "../location";

export default class Page {
  @observable key = "";
  @observable value = "";
  @observable annotations = [];

  static create(key, data) {
    const ref = firebase
      .database()
      .ref(`${pageUtils.domain}`)
      .child("selectors")
      .child(key);
    // this new, empty ref only exists locally
    var newChildRef = ref.push();
    // now it is appended at the end of data at the server
    newChildRef.set(data);
  }
}
