import types from "./types";

const addInviteUser = email => ({
  type: types.ADD_INVITE_USER,
  payload: {
    email
  }
});

const addInviteUserFailed = err => ({
  type: types.ADD_INVITE_USER_FAILED,
  payload: {
    err
  }
});

const getWorkspaceById = id => ({
  type: types.GET_WORKSPACE_BY_ID,
  payload: {
    id
  }
});

const getWorkspaceByIdSuccess = data => ({
  type: types.GET_WORKSPACE_BY_ID_SUCCESS,
  payload: {
    data
  }
});

const getWorkspaceByIdFailed = (id, err) => ({
  type: types.GET_WORKSPACE_BY_ID_FAILED,
  payload: {
    id,
    err
  }
});

export default {
  getWorkspaceById,
  getWorkspaceByIdSuccess,
  getWorkspaceByIdFailed,
  addInviteUser,
  addInviteUserFailed
};
