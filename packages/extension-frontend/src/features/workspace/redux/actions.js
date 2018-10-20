import types from './types';

const inviteToWorkspace = (firstName, lastName, email, workspaceId) => ({
  type: types.INVITE_TO_WORKSPACE_REQUEST,
  payload: {
    firstName,
    lastName,
    email,
    workspaceId
  }
});

const inviteToWorkspaceSuccess = (email, workspaceId) => ({
  type: types.INVITE_TO_WORKSPACE_SUCCESS,
  payload: {
    email,
    workspaceId
  }
});

const inviteToWorkspaceFailed = (email, workspaceId, error) => ({
  type: types.INVITE_TO_WORKSPACE_FAILED,
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
  inviteToWorkspace,
  inviteToWorkspaceSuccess,
  inviteToWorkspaceFailed,
  createWorkspace,
  createWorkspaceSuccess,
  createWorkspaceFailed
};
