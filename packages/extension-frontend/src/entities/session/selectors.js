import { createSelector } from 'reselect';

const sessionSelector = state => state.entities.session;

const currentUserIdSelector = () =>
  createSelector(sessionSelector, user => user.uid);

const currentWorkspaceSelector = () =>
  createSelector(sessionSelector, user => user.workspaceId);

export default {
  currentWorkspaceSelector,
  currentUserIdSelector
};
