import types from './types';

const addWorkspaceUser = (email, workspaceId) => ({
  type: types.ADD_WORKSPACE_USER_REQUEST,
  payload: {
    email,
    workspaceId
  }
});

const addWorkspaceUserSuccess = (email, workspaceId) => ({
  type: types.ADD_WORKSPACE_USER_SUCCESS,
  payload: {
    email,
    workspaceId
  }
});

const addWorkspaceUserFailed = (email, workspaceId, error) => ({
  type: types.ADD_WORKSPACE_USER_FAILED,
  payload: {
    email,
    workspaceId,
    error
  }
});

const createWorkspace = (name, emails = []) => ({
  type: types.CREATE_WORKSPACE,
  payload: {
    name,
    emails
  }
});

const createWorkspaceSuccess = name => ({
  type: types.CREATE_WORKSPACE_SUCCESS,
  payload: {
    name
  }
});

const createWorkspaceFailed = (name, error) => ({
  type: types.CREATE_WORKSPACE_FAILED,
  payload: {
    name,
    error
  }
});

export default {
  addWorkspaceUser,
  addWorkspaceUserSuccess,
  addWorkspaceUserFailed,
  createWorkspace,
  createWorkspaceSuccess,
  createWorkspaceFailed
};
