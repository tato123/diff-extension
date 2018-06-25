import { ACTIONS, MESSAGES_FRONTEND_SOURCE } from "@diff/common/keys";
import { fetchCacheToken } from "@diff/common/actions";
import {
  composeRemoteAction,
  cacheTokenRequest,
  loginSuccess
} from "../../../../common/actions";
import { ACTIONS as localActions } from "store/actions";
import firebase from "firebase";

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
    [ACTIONS.FETCH_CACHE_TOKEN.REQUEST]: (state, payload) => {
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    },
    [ACTIONS.FETCH_CACHE_TOKEN.SUCCESS]: (state, { token }) => {
      return {
        ...state,
        access_token: null,
        refresh_token: token
      };
    },
    [ACTIONS.FETCH_CACHE_TOKEN.FAILED]: (state, payload) => {
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    },
    [ACTIONS.LOGIN.REQUEST]: (state, payload) => {
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
      return {
        ...state,
        access_token,
        refresh_token
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
            dispatch.user.remoteCacheToken(token);
          })
          .catch(error => {
            console.error(error);
            dispatch.user[ACTIONS.LOGIN.FAILED](error);
            return Promise.reject();
          });
      } catch (err) {
        dispatch.user[ACTIONS.LOGIN.FAILED](err);
        return Promise.reject();
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
