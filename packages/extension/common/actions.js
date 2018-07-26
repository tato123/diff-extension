import types from "./types";

const composeRemoteAction = (action, source, dest) =>
  Object.assign(
    {},
    {
      source,
      dest
    },
    action
  );

// -------------------------------------------------------
// User actions
// -------------------------------------------------------

const runRequest = () => ({
  type: types.RUN_REQUEST.REQUEST
});

// -------------------------------------------------------
// User actions
// -------------------------------------------------------

const fetchUserPreferences = () => ({
  type: types.FETCH_USER_PREFERENCES.REQUEST
});

const fetchUserPreferencesSuccess = preferences => ({
  type: types.FETCH_USER_PREFERENCES.SUCCESS,
  payload: {
    preferences: {
      ...preferences
    }
  }
});

const fetchUserPreferencesFailed = err => ({
  type: types.FETCH_USER_PREFERENCES.FAILED,
  meta: {
    err
  }
});

const storeUserPreferencesSuccess = () => ({
  type: types.STORE_USER_PREFERENCES.SUCCESS,
  payload: {}
});

const storeUserPreferencesFailed = err => ({
  type: types.STORE_USER_PREFERENCES.FAILED,
  meta: {
    err
  }
});

// -------------------------------------------------------
// Token actions
// -------------------------------------------------------

const cacheTokenRequest = token => ({
  type: types.CACHE_TOKEN.REQUEST,
  payload: {
    token
  }
});

const cacheTokenFailed = err => ({
  type: types.CACHE_TOKEN.FAILED,
  meta: {
    err
  }
});

const cacheTokenSuccess = () => ({
  type: types.CACHE_TOKEN.SUCCESS
});

const fetchCacheToken = () => ({
  type: types.FETCH_CACHE_TOKEN.REQUEST
});

const fetchCacheTokenFailed = err => ({
  type: types.FETCH_CACHE_TOKEN.FAILED,
  meta: {
    err
  }
});

const fetchCacheTokenSuccess = token => ({
  type: types.FETCH_CACHE_TOKEN.SUCCESS,
  payload: {
    token
  }
});

const validateCanRunRequest = domain => ({
  type: types.VALIDATE_CAN_RUN.REQUEST,
  payload: {
    domain: window.location.hostname
  }
});

const loginRequest = credentials => ({
  type: types.LOGIN.REQUEST,
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

const loginFailed = err => ({
  type: types.LOGIN.FAILED,
  meta: {
    err
  }
});

export default {
  composeRemoteAction,
  runRequest,
  fetchUserPreferences,
  fetchUserPreferencesSuccess,
  fetchUserPreferencesFailed,
  storeUserPreferencesSuccess,
  storeUserPreferencesFailed,
  cacheTokenRequest,
  cacheTokenFailed,
  cacheTokenSuccess,
  fetchCacheToken,
  fetchCacheTokenFailed,
  fetchCacheTokenSuccess,
  validateCanRunRequest,
  loginSuccess,
  loginFailed,
  loginRequest
};
