import { createSelector } from "reselect";

const users = state => state.user;

const getCurrentUserId = () => createSelector(users, user => user.uid);

const getCurrentWorkspace = () =>
  createSelector(users, user => user.workspaceId);

export default {
  getCurrentUserId,
  getCurrentWorkspace
};
