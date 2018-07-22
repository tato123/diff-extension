import { combineReducers } from "redux";
import diff from "./diff";
import elements from "./elements";
import launcher from "./launcher";
import user from "./user";
import widgets from "./widgets";

export default combineReducers({
  diff,
  elements,
  launcher,
  user,
  widgets
});
