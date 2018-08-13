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

const validateUser = email => ({
  type: types.VALIDATE_USER_REQUEST,
  payload: {
    email
  }
});

const validateUserSuccess = email => ({
  type: types.VALIDATE_USER_SUCCESS,
  payload: {
    email
  }
});

const validateUserFailed = (email, err) => ({
  type: types.VALIDATE_USER_FAILED,
  payload: {
    email,
    err
  }
});

const asyncValidate = (email, dispatch) =>
  remoteActions.promisedAction({
    submit: validateUser(email),
    success: types.VALIDATE_USER_SUCCESS,
    failed: types.VALIDATE_USER_FAILED,
    dispatch
  });

export default {
  signupRequest,
  signupSuccess,
  signupFailed,
  asyncSignup,

  validateUser,
  validateUserSuccess,
  validateUserFailed,
  asyncValidate
};
