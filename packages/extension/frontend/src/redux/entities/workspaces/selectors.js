import { createSelector } from "reselect";
import _ from "lodash";

const workspaceDomain = state => state.entities.workspaces;

const usersDomain = state => state.entities.users;

/**
 * When no id is provided the default workspace is selected
 * (which maps back to the first workspace)
 */
const workspaceNameSelector = id =>
  createSelector(workspaceDomain, workspace => {
    const targetId = _.isNil(id) ? workspace.allIds[0] : id;
    return !_.isNil(targetId) ? workspace.byId[targetId].name : null;
  });

const workspaceUsersSelector = id =>
  createSelector(workspaceDomain, usersDomain, (workspace, users) => {
    const targetId = _.isNil(id) ? workspace.allIds[0] : id;

    return _.isNil(targetId)
      ? []
      : _.chain(_.keys(workspace.byId[targetId].users))
          .map(user => users.byId[user])
          .value();
  });

const currentWorkspaceIdSelector = id =>
  createSelector(workspaceDomain, workspace => {
    return workspace.allIds[0] || null;
  });

const invitedUsersSelector = () =>
  createSelector(workspaceDomain, workspace => workspace.invites);

const defaultWorkspaceSelector = () =>
  createSelector(workspaceDomain, workspace => _.first(workspace.allIds));

export default {
  workspaceNameSelector,
  workspaceUsersSelector,
  currentWorkspaceIdSelector,
  invitedUsersSelector,
  defaultWorkspaceSelector
};
