import types from "./types";

const signupRequest = (email, password) => ({
  type: types.SIGNUP_REQUEST,
  payload: {
    email,
    password
  }
});

const signupSuccess = () => ({
  type: types.SIGNUP_SUCCESS
});

const signupFailed = err => ({
  type: types.SIGNUP_FAILED,
  payload: {
    err
  }
});

export default {
  signupRequest,
  signupSuccess,
  signupFailed
};
