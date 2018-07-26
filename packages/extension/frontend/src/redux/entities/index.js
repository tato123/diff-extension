import { combineReducers } from "redux";

// entity types
import comments from "./comments";
import diffs from "./diffs";
import selectors from "./selectors";
import users from "./users";

export default combineReducers({
  comments,
  diffs,
  selectors,
  users
});
