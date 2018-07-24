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

const loginRequest = () => ({
  type: types.LOGIN_REQUEST
});

export default {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailed,
  loginRequest
};
