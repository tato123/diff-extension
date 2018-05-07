import { observable, computed } from "mobx";
import * as firebase from "firebase";

export default class Annotation {
  @observable key = "";
  @observable value = "";

  static create(key, data) {
    const ref = firebase
      .database()
      .ref(`${domain()}`)
      .child("annotations");
    // this new, empty ref only exists locally
    var newChildRef = ref.push();
    // now it is appended at the end of data at the server
    newChildRef.set(annotation);
  }

  static fromSnapshot(snapshot) {
    const annotation = new Annotation();
    annotation.key = snapshot.key;
    return annotation;
  }
}
