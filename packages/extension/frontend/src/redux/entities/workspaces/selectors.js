import { createSelector } from "reselect";
import _ from "lodash";

const workspaceDomain = state => state.entities.workspaces;

const loggedInUserDomain = state => state.user;

const usersDomain = state => state.entities.users;

const currentWorkspaceNameSelector = () =>
  createSelector(
    workspaceDomain,
    loggedInUserDomain,
    (workspace, loggedInUser) => {
      return _.isNil(loggedInUser.workspaceId)
        ? ""
        : _.get(workspace.byId[loggedInUser.workspaceId], "name", "");
    }
  );

const currentWorkspaceUsersSelector = () =>
  createSelector(
    workspaceDomain,
    loggedInUserDomain,
    usersDomain,
    (workspace, loggedInUser, users) => {
      return _.isNil(loggedInUser.workspaceId)
        ? []
        : _.chain(
            _.keys(_.get(workspace.byId[loggedInUser.workspaceId], "users", []))
          )
            .map(user => users.byId[user])
            .value();
    }
  );

const currentWorkspaceIdSelector = () =>
  createSelector(loggedInUserDomain, user => user.workspaceId);

const invitedUsersSelector = () =>
  createSelector(workspaceDomain, workspace => workspace.invites);

export default {
  currentWorkspaceNameSelector,
  currentWorkspaceUsersSelector,
  currentWorkspaceIdSelector,
  invitedUsersSelector
};
