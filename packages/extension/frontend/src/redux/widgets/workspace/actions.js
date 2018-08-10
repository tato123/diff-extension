import types from "./types";

const addWorkspaceUserRequest = (email, workspace) => ({
  type: types.ADD_WORKSPACE_USER_REQUEST,
  payload: {
    email,
    workspace
  }
});

const addWorkspaceUserSuccess = (email, workspace) => ({
  type: types.ADD_WORKSPACE_USER_SUCCESS,
  payload: {
    email,
    workspace
  }
});

const addWorkspaceUserFailed = (email, workspace, err) => ({
  type: types.ADD_WORKSPACE_USER_FAILED,
  payload: {
    email,
    workspace,
    err
  }
});

const createWorkspace = name => ({
  type: types.CREATE_WORKSPACE,
  payload: {
    name
  }
});

const createWorkspaceSuccess = name => ({
  type: types.CREATE_WORKSPACE_SUCCESS,
  payload: {
    name
  }
});

const createWorkspaceFailed = (name, err) => ({
  type: types.CREATE_WORKSPACE_FAILED,
  payload: {
    name,
    err
  }
});

export default {
  addWorkspaceUserRequest,
  addWorkspaceUserSuccess,
  addWorkspaceUserFailed,
  createWorkspace,
  createWorkspaceSuccess,
  createWorkspaceFailed
};
