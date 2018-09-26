import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import state, { epics as stateEpics } from "./state";
import diff, { epics as diffEpics } from "./diff";
import launcher from "./launcher";
import selectors, { epics as selectorEpics } from "./selectors";
import workspace, { epics as workspaceEpics } from "./workspace";

export default combineReducers({
  state,
  diff,
  launcher,
  selectors,
  workspace
});

export const epics = combineEpics(
  diffEpics,
  workspaceEpics,
  selectorEpics,
  stateEpics
);
