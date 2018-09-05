import types from "./types";
import { actions as commonActions } from "@diff/common";

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

const fetchCacheToken = () => commonActions.fetchCacheToken();

const login = credentials => ({
  type: types.LOGIN_REQUEST,
  payload: {
    ...credentials
  }
});

const loginSuccess = token => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    token
  }
});

const loginFailed = error => ({
  type: types.LOGIN_FAILED,
  payload: {
    error
  }
});

const sessionInit = user => ({
  type: types.SESSION_INIT,
  payload: {
    user
  }
});

const sessionInitFailed = (err, uid) => ({
  type: types.SESSION_INIT_FAILED,
  payload: {
    uid,
    err
  }
});

const selectWorkspace = workspaceId => ({
  type: types.SELECT_WORKSPACE,
  payload: {
    workspaceId
  }
});

const showForm = form => ({
  type: types.SHOW_FORM,
  payload: {
    form
  }
});

export default {
  signupRequest,
  signupSuccess,
  signupFailed,

  validateUser,
  validateUserSuccess,
  validateUserFailed,
  fetchCacheToken,
  login,
  loginSuccess,
  loginFailed,

  sessionInit,
  sessionInitFailed,

  selectWorkspace,
  showForm
};
