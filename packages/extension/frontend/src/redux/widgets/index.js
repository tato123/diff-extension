import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import state from "./state";
import diff, { epics as diffEpics } from "./diff";
import launcher from "./launcher";
import selectors from "./selectors";

export default combineReducers({
  state,
  diff,
  launcher,
  selectors
});

export const epics = combineEpics(diffEpics);
