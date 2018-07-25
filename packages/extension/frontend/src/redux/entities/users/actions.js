import types from "./types";

const fetchUserRequest = () => ({
  type: types.FETCH_USER_REQUEST
});

const fetchUserSuccess = payload => ({
  type: types.FETCH_USER_SUCCESS,
  payload
});

const fetchUserFailed = err => ({
  type: types.FETCH_USER_FAILED,
  payload: {
    err
  }
});

export default {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailed
};
