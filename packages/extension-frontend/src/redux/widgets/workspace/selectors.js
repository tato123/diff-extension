import { createSelector } from "reselect";

const workspaceDomain = state => state.widgets.workspace;
const users = state => state.user;

const getCurrentUserId = () => createSelector(users, user => user.uid);

const getCurrentWorkspace = () =>
  createSelector(users, user => user.workspaceId);

const isCreateWorkspaceSubmittingSelector = () =>
  createSelector(
    workspaceDomain,
    workspace => workspace.meta.createWorkspace.isSubmitting
  );

const isCreateWorkspaceSubmitErrorSelector = () =>
  createSelector(
    workspaceDomain,
    workspace => workspace.meta.createWorkspace.submitError
  );

export default {
  getCurrentUserId,
  getCurrentWorkspace,
  isCreateWorkspaceSubmittingSelector,
  isCreateWorkspaceSubmitErrorSelector
};
