import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

// entity types
import comments, { epics as commentEpics } from './comments';
import diffs, { epics as diffEpics } from './diffs';
import selectors from './selectors';
import users, { epics as userEpics } from './users';
import activity, { epics as activityEpic } from './activity';
import workspaces, { epics as workspaceEpics } from './workspaces';
import session, { epics as sessionEpics } from './session';

export default combineReducers({
  comments,
  diffs,
  selectors,
  users,
  activity,
  workspaces,
  session
});

export const epics = combineEpics(
  activityEpic,
  commentEpics,
  diffEpics,
  workspaceEpics,
  userEpics,
  sessionEpics
);
