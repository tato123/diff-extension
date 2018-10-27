import types from './types';

const getInvitesByWorkspaceId = (data, id) => ({
  type: types.GET_INVITES_BY_ID,
  payload: {
    data,
    id
  }
});

const getInvitesByWorkspaceIdSuccess = (data, id) => ({
  type: types.GET_INVITES_BY_ID_SUCCESS,
  payload: {
    data,
    id
  }
});

const getInvitesByWorkspaceIdFailed = error => ({
  type: types.GET_INVITES_BY_ID_FAILED,
  payload: {
    error
  }
});

export default {
  getInvitesByWorkspaceId,
  getInvitesByWorkspaceIdSuccess,
  getInvitesByWorkspaceIdFailed
};
