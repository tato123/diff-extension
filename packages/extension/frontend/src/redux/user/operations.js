import { actions as commonActions, types as commonTypes } from "@diff/common";
import firebase from "firebase";
import { authenticate } from "./api";
import { actions as remoteActions } from "redux/remote";
import { operations as diffOperations } from "redux/diff";
import actions from "./actions";

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

    const token = await authenticate(username, password, refreshToken);

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

        // perform post login
        // fetch our
        dispatch(diffOperations.getComments());
        // dispatch(diffOperations.getDiffs());

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

/**
 *
 * @param {{}} action
 * @returns {Function}
 */
const fetchUser = uid => async (dispatch, getState, { db }) => {
  try {
    /* eslint-disable */

    const doc = await db
      .collection("users")
      .doc(uid)
      .get();

    if (doc.exists) {
      return dispatch(actions.fetchUserSuccess(doc.data()));
    }
    return dispatch(actions.fetchUserFailed("Unable to get user data"));
  } catch (error) {
    console.log(error);
    return dispatch(actions.fetchUserFailed(error.message));
  }
};

export default {
  fetchUser,
  fetchCacheToken,
  remoteCacheToken,
  login
};
