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

const allCollaboratorsSelectors = createSelector(
  (state, props) => state.entities.workspaces.byId[props.id],
  state => state.entities.users.byId,
  (workspace, users) =>
    Object.keys(workspace.users).map(userId => users[userId])
);

const allInviteSelectors = createSelector(
  (state, props) => state.entities.workspaces.byId[props.id],
  state => state.entities.invites.byId,
  (workspace, invites) =>
    Object.keys(workspace.invites).map(userId => invites[userId])
);

export default {
  allWorkspacesSelector,
  getCurrentWorkspace,
  isCreateWorkspaceSubmittingSelector,
  isCreateWorkspaceSubmitErrorSelector,
  allCollaboratorsSelectors,
  allInviteSelectors
};
