import { ACTIONS } from "./keys";

export const composeRemoteAction = (action, source, dest) =>
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

export const runRequest = () => ({
  type: ACTIONS.RUN_REQUEST.REQUEST
});

// -------------------------------------------------------
// User actions
// -------------------------------------------------------

export const fetchUserPreferences = () => ({
  type: ACTIONS.FETCH_USER_PREFERENCES.REQUEST
});

export const fetchUserPreferencesSuccess = preferences => ({
  type: ACTIONS.FETCH_USER_PREFERENCES.SUCCESS,
  payload: {
    preferences: {
      ...preferences
    }
  }
});

export const fetchUserPreferencesFailed = err => ({
  type: ACTIONS.FETCH_USER_PREFERENCES.FAILED,
  meta: {
    err
  }
});

export const storeUserPreferencesSuccess = () => ({
  type: ACTIONS.STORE_USER_PREFERENCES.SUCCESS,
  payload: {}
});

export const storeUserPreferencesFailed = err => ({
  type: ACTIONS.STORE_USER_PREFERENCES.FAILED,
  meta: {
    err
  }
});

// -------------------------------------------------------
// Token actions
// -------------------------------------------------------

export const cacheTokenRequest = token => ({
  type: ACTIONS.CACHE_TOKEN.REQUEST,
  payload: {
    token
  }
});

export const cacheTokenFailed = err => ({
  type: ACTIONS.CACHE_TOKEN.FAILED,
  meta: {
    err
  }
});

export const cacheTokenSuccess = () => ({
  type: ACTIONS.CACHE_TOKEN.SUCCESS
});

export const fetchCacheToken = () => ({
  type: ACTIONS.FETCH_CACHE_TOKEN.REQUEST
});

export const fetchCacheTokenFailed = err => ({
  type: ACTIONS.FETCH_CACHE_TOKEN.FAILED,
  meta: {
    err
  }
});

export const fetchCacheTokenSuccess = token => ({
  type: ACTIONS.FETCH_CACHE_TOKEN.SUCCESS,
  payload: {
    token
  }
});

export const validateCanRunRequest = domain => ({
  type: ACTIONS.VALIDATE_CAN_RUN.REQUEST,
  payload: {
    domain: window.location.hostname
  }
});

export const loginSuccess = token => ({
  type: ACTIONS.LOGIN.SUCCESS,
  payload: {
    token
  }
});
