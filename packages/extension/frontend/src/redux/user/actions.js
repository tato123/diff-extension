import types from "./types";
import { actions as remoteActions } from "redux/remote";
import { actions as commonActions, types as commonTypes } from "@diff/common";

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

/**
 * Calls a backend to retrieve a fetch cache token
 *
 * @param {}
 * @returns {Promise}
 */
const fetchCacheToken = () => dispatch => {
  return remoteActions
    .promisedAction({
      submit: remoteActions.postMessage(commonActions.fetchCacheToken()),
      success: commonTypes.FETCH_CACHE_TOKEN.SUCCESS,
      failed: commonTypes.FETCH_CACHE_TOKEN.FAILED,
      dispatch
    })
    .then(successAction => {
      return successAction.payload.token;
    })
    .catch(errorAction => {
      return Promise.reject(new Error("No Token available", errorAction));
    });
};

const login = credentials => ({
  type: types.LOGIN_REQUEST,
  payload: {
    ...credentials
  }
});

const loginSuccess = token => ({
  type: types.LOGIN.SUCCESS,
  payload: {
    token
  }
});

export default {
  signupRequest,
  signupSuccess,
  signupFailed,
  asyncSignup,

  validateUser,
  validateUserSuccess,
  validateUserFailed,
  asyncValidate,
  fetchCacheToken,
  login,
  loginSuccess
};
