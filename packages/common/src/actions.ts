import { AnyAction } from 'redux';
import types from './types';

export interface RemoteAction {
  source: string;
  dest: string;
  action: AnyAction;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}

const composeRemoteAction = (
  action: AnyAction,
  source: string,
  dest: string
): AnyAction => ({
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

interface FetchUserRequestAction extends AnyAction {
  payload: {
    hostname: string;
    pathname: string;
  };
}

const fetchUserPreferences = (
  hostname: string,
  pathname: string
): FetchUserRequestAction => ({
  type: types.FETCH_USER_PREFERENCES.REQUEST,
  payload: {
    hostname,
    pathname
  }
});

const fetchUserPreferencesSuccess = (preferences: Object): AnyAction => ({
  type: types.FETCH_USER_PREFERENCES.SUCCESS,
  payload: {
    ...preferences
  }
});

const fetchUserPreferencesFailed = (error: string): AnyAction => ({
  type: types.FETCH_USER_PREFERENCES.FAILED,
  payload: {
    error
  }
});

// -------------------------------------------------------
// Set cache token actions
// -------------------------------------------------------

const cacheTokenRequest = (token: string): AnyAction => ({
  type: types.CACHE_TOKEN.REQUEST,
  payload: {
    token
  }
});

const cacheTokenFailed = (error: string): AnyAction => ({
  type: types.CACHE_TOKEN.FAILED,
  payload: {
    error
  }
});

const cacheTokenSuccess = (): AnyAction => ({
  type: types.CACHE_TOKEN.SUCCESS
});

// -------------------------------------------------------
// get cache token actions
// -------------------------------------------------------

const fetchCacheToken = (): AnyAction => ({
  type: types.FETCH_CACHE_TOKEN.REQUEST
});

const fetchCacheTokenFailed = (error: string): AnyAction => ({
  type: types.FETCH_CACHE_TOKEN.FAILED,
  payload: {
    error
  }
});

const fetchCacheTokenSuccess = (token: {}): AnyAction => ({
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
