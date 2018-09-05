import types from "./types";
import { AnyAction } from "redux";

import * as diffTypes from "./index.d";

const composeRemoteAction = (
  action: AnyAction,
  source: string,
  dest: string
): diffTypes.RemoteAction => ({
  source,
  dest,
  ...action
});

// -------------------------------------------------------
// User actions
// -------------------------------------------------------

const runRequest = () => ({
  type: types.RUN_REQUEST.REQUEST
});

// -------------------------------------------------------
// User actions
// -------------------------------------------------------

const fetchUserPreferences = (): AnyAction => ({
  type: types.FETCH_USER_PREFERENCES.REQUEST
});

const fetchUserPreferencesSuccess = (preferences: Object): AnyAction => ({
  type: types.FETCH_USER_PREFERENCES.SUCCESS,
  payload: {
    preferences: {
      ...preferences
    }
  }
});

const fetchUserPreferencesFailed = (err: string): AnyAction => ({
  type: types.FETCH_USER_PREFERENCES.FAILED,
  meta: {
    err
  }
});

// -------------------------------------------------------
// Token actions
// -------------------------------------------------------

const cacheTokenRequest = (token: string): AnyAction => ({
  type: types.CACHE_TOKEN.REQUEST,
  payload: {
    token
  }
});

const cacheTokenFailed = (err: string): AnyAction => ({
  type: types.CACHE_TOKEN.FAILED,
  meta: {
    err
  }
});

const cacheTokenSuccess = (): AnyAction => ({
  type: types.CACHE_TOKEN.SUCCESS
});

const fetchCacheToken = (): AnyAction => ({
  type: types.FETCH_CACHE_TOKEN.REQUEST
});

const fetchCacheTokenFailed = (err: string): AnyAction => ({
  type: types.FETCH_CACHE_TOKEN.FAILED,
  meta: {
    err
  }
});

const fetchCacheTokenSuccess = (token: diffTypes.Token): AnyAction => ({
  type: types.FETCH_CACHE_TOKEN.SUCCESS,
  payload: {
    token
  }
});

export default {
  composeRemoteAction,
  runRequest,
  fetchUserPreferences,
  fetchUserPreferencesSuccess,
  fetchUserPreferencesFailed,

  cacheTokenRequest,
  cacheTokenFailed,
  cacheTokenSuccess,
  fetchCacheToken,
  fetchCacheTokenFailed,
  fetchCacheTokenSuccess
};
