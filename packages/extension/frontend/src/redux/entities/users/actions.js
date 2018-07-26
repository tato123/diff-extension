import types from "./types";

const fetchUserRequest = uid => ({
  type: types.FETCH_USER_REQUEST,
  payload: {
    uid
  }
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
