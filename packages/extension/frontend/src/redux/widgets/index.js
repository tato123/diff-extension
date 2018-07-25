import { combineReducers } from "redux";

import state from "./state";
import diff from "./diff";
import launcher from "./launcher";
import selectors from "./selectors";

export default combineReducers({
  state,
  diff,
  launcher,
  selectors
});
