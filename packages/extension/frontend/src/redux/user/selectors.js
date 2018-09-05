import { createSelector } from "reselect";

const userSelector = state => state.user;

const accessTokenSelector = () =>
  createSelector(userSelector, user => user.access_token);

const refreshTokenSelector = () =>
  createSelector(userSelector, user => user.refresh_token);

const isFetchingTokenSelector = () =>
  createSelector(
    userSelector,
    user => (user.meta && user.meta.isFetchingToken) || false
  );

const requiresLoginSelector = () =>
  createSelector(
    userSelector,
    user => (user.meta && user.meta.requiresLogin) || false
  );

const currentUserIdSelector = () =>
  createSelector(userSelector, user => user.uid);

const currentWorkspaceSelector = () =>
  createSelector(userSelector, user => user.workspaceId);

const formSelector = () => createSelector(userSelector, user => user.meta.form);

export default {
  accessTokenSelector,
  refreshTokenSelector,
  isFetchingTokenSelector,
  requiresLoginSelector,
  currentWorkspaceSelector,
  currentUserIdSelector,
  formSelector
};
