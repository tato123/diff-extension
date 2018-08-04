import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

// entity types
import comments from "./comments";
import diffs from "./diffs";
import selectors from "./selectors";
import users from "./users";
import activity, { epics as activityEpic } from "./activity";

export default combineReducers({
  comments,
  diffs,
  selectors,
  users,
  activity
});

export const epics = combineEpics(activityEpic);
