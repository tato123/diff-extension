// @flow

import { ACTIONS } from "@diff/common/keys";
import { fetchCacheToken } from "@diff/common/actions";
import { cacheTokenRequest, loginSuccess } from "../../../../common/actions";
import { ACTIONS as localActions } from "store/actions";
import firebase from "firebase";
import jwtDecode from "jwt-decode";

export type AuthState = {
  access_token: ?string,
  refresh_token: ?string
};

const authenticate = async (
  username: ?string,
  password: ?string,
  refreshToken: ?string
) => {
  const options = refreshToken
    ? {
        body: `refresh_token=${refreshToken}&grant_type=refresh_token`
      }
    : {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
      };

  const response = await fetch(`${process.env.API_SERVER}/authenticate`, {
    ...options,
    method: "POST"
  });

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
};

export default {
  state: {
    access_token: null,
    refresh_token: null
  },
  reducers: {
    [ACTIONS.FETCH_CACHE_TOKEN.REQUEST]: (state: AuthState, payload) => {
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    },
    [ACTIONS.FETCH_CACHE_TOKEN.SUCCESS]: (state: AuthState, { token }) => {
      return {
        ...state,
        access_token: null,
        refresh_token: token
      };
    },
    [ACTIONS.FETCH_CACHE_TOKEN.FAILED]: (state: AuthState, payload) => {
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    },
    [ACTIONS.LOGIN.REQUEST]: (state: AuthState, payload) => {
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    },
    [ACTIONS.LOGIN.SUCCESS]: (
      state,
      { token: { access_token, refresh_token } }
    ) => {
      const { claims, uid } = jwtDecode(access_token);
      console.log(jwtDecode(access_token));
      return {
        ...state,
        access_token,
        refresh_token,
        ...claims,
        selectedAccount: Object.keys(claims.accounts)[0],
        uid
      };
    },
    [ACTIONS.LOGIN.FAILED]: (state, payload) => {
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    }
  },
  effects: dispatch => ({
    login: async ({ username, password, refreshToken }) => {
      try {
        const token = await authenticate(username, password, refreshToken);

        // login to firebase
        return firebase
          .auth()
          .signInWithCustomToken(token.access_token)
          .then(response => {
            console.log("[FIREBASE val]", response);
            // dispatch a success
            dispatch(loginSuccess(token));

            // cache our token
            dispatch.auth.remoteCacheToken(token);
          })
          .catch(error => {
            console.error(error);
            dispatch.auth[ACTIONS.LOGIN.FAILED](error);
            return Promise.reject(error);
          });
      } catch (err) {
        dispatch.auth[ACTIONS.LOGIN.FAILED](err);
        return Promise.reject(err);
      }
    },
    // consider removing all remote actions to one place
    remoteCacheToken: ({ refresh_token: token }) => {
      // forward with our remote flag
      dispatch(localActions.postMessage(cacheTokenRequest(token)));
    },
    fetchCatchTokenAsync: async () =>
      localActions
        .promisedAction({
          submit: localActions.postMessage(fetchCacheToken()),
          success: ACTIONS.FETCH_CACHE_TOKEN.SUCCESS,
          failed: ACTIONS.FETCH_CACHE_TOKEN.FAILED
        })
        .then(successAction => successAction.payload.token)
        .catch(errorAction => Promise.reject("No Token available"))
  })
};