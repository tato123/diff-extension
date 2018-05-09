import { observable } from "mobx";
import Persistable from "./persitable";

export default class Page extends Persistable {
  @observable key = "";
  @observable value = "";

  static storageKey() {
    return "pages";
  }
}
