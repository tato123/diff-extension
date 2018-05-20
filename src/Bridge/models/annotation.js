import { observable } from "mobx";
import Persistable from "./persitable";

export default class Annotation extends Persistable {
  @observable key = "";
  @observable value = "";

  static storageKey() {
    return "annotations";
  }
}
