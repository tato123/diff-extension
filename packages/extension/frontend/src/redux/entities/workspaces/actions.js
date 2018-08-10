import types from "./types";

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
  getWorkspaceByIdFailed
};
