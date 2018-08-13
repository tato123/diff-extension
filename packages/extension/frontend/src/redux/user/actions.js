import types from "./types";
import { actions as remoteActions } from "redux/remote";

const signupRequest = (email, password) => ({
  type: types.SIGNUP_REQUEST,
  payload: {
    email,
    password
  }
});

const signupSuccess = refreshToken => ({
  type: types.SIGNUP_SUCCESS,
  payload: {
    refreshToken
  }
});

const signupFailed = (email, err) => ({
  type: types.SIGNUP_FAILED,
  payload: {
    err,
    email
  }
});

const asyncSignup = (email, password, dispatch) =>
  remoteActions.promisedAction({
    submit: signupRequest(email, password),
    success: types.SIGNUP_SUCCESS,
    failed: types.SIGNUP_FAILED,
    dispatch
  });

export default {
  signupRequest,
  signupSuccess,
  signupFailed,
  asyncSignup
};
