import { actions as commonActions, types as commonTypes } from "@diff/common";
import firebase from "firebase";
import actions from "./actions";
import api from "./api";
import { actions as remoteActions } from "redux/remote";

import { operations as diffOperations } from "redux/entities/diffs";
import { operations as commentOperations } from "redux/entities/comments";

/**
 * Async login operation that should be used for logging in via refresh credentials
 * or via username / password strategy
 * @param {{username:string}} credentials - username, refreshCredential, or password
 * @returns {Function}
 */
const login = credentials => async dispatch => {
  try {
    // dispatch a notification that we are working on a request
    dispatch(commonActions.loginRequest(credentials));

    const { username, password, refreshToken } = credentials;

    const token = await api.authenticate(username, password, refreshToken);

    // login to firebase
    return firebase
      .auth()
      .signInWithCustomToken(token.access_token)
      .then(response => {
        console.log("[FIREBASE val]", response);
        // dispatch a success
        dispatch(commonActions.loginSuccess(token));

        // cache our token
        dispatch(remoteCacheToken(token));

        dispatch(postLogin());
        // perform post login
        // fetch our

        return Promise.resolve();
      })
      .catch(error => {
        console.error(error);
        dispatch(commonActions.loginFailed(error));
        return Promise.reject(error);
      });
  } catch (err) {
    dispatch(commonActions.loginFailed(err));
    return Promise.reject(err);
  }
};

/**
 * Prelogin attempts to pre-fetch some of our data
 */
const postLogin = () => async dispatch => {
  // fetch all of our diff comments
  dispatch(commentOperations.fetchComments());

  // fetch all of our diffs
  dispatch(diffOperations.getDiffs());

  return Promise.resolve();
};

const signup = (email, password) => async dispatch => {
  try {
    // dispatch a notification that we are working on a request
    dispatch(actions.signupRequest(email, password));

    const { refresh_token: refreshToken } = await api.signup(email, password);

    dispatch(actions.signupSuccess());
    return Promise.resolve(refreshToken);
  } catch (err) {
    dispatch(actions.signupFailed(err));
    return Promise.reject(err);
  }
};

/**
 *
 * @param {{refresh_token:string}} param
 * @returns {Function}
 */
const remoteCacheToken = ({ refresh_token: token }) => dispatch => {
  // forward with our remote flag
  dispatch(remoteActions.postMessage(commonActions.cacheTokenRequest(token)));
};

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
    .then(successAction => successAction.payload.token)
    .catch(errorAction => {
      Promise.reject(new Error("No Token available", errorAction));
    });
};

export default {
  fetchCacheToken,
  remoteCacheToken,
  login,
  signup
};
