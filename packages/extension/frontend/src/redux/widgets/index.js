import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import state from "./state";
import diff, { epics as diffEpics } from "./diff";
import launcher from "./launcher";
import selectors from "./selectors";
import workspace, { epics as workspaceEpics } from "./workspace";

export default combineReducers({
  state,
  diff,
  launcher,
  selectors,
  workspace
});

export const epics = combineEpics(diffEpics, workspaceEpics);
