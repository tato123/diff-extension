import { createSelector } from 'reselect';
import _ from 'lodash-es';

const allWorkspacesSelector = createSelector(
  state => state.entities.workspaces,
  workspaces => _.values(workspaces.byId) || []
);

const workspaceDomain = state => state.workspace;
const users = state => state.user;

const getCurrentWorkspace = () =>
  createSelector(users, user => user.workspaceId);

const isCreateWorkspaceSubmittingSelector = createSelector(
  workspaceDomain,
  workspace => workspace.meta.createWorkspace.isSubmitting
);

const isCreateWorkspaceSubmitErrorSelector = createSelector(
  workspaceDomain,
  workspace => workspace.meta.createWorkspace.submitError
);

export default {
  allWorkspacesSelector,
  getCurrentWorkspace,
  isCreateWorkspaceSubmittingSelector,
  isCreateWorkspaceSubmitErrorSelector
};
