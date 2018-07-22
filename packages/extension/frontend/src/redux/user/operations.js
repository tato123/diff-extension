import * as commonActions from "@diff/common/actions";
import { cacheTokenRequest, loginSuccess } from "../../../../common/actions";
import firebase from "firebase";
import { authenticate } from "./api";
import { actions as remoteActions } from "redux/remote";

const login = ({ username, password, refreshToken }) => async dispatch => {
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
        dispatch(remoteCacheToken(token));
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

const remoteCacheToken = ({ refresh_token: token }) => dispatch => {
  // forward with our remote flag
  dispatch(remoteActions.postMessage(cacheTokenRequest(token)));
};

/* eslint-disable */
const fetchCacheToken = () => dispatch => {
  debugger;
  remoteActions
    .promisedAction({
      submit: remoteActions.postMessage(commonActions.fetchCacheToken()),
      success: ACTIONS.FETCH_CACHE_TOKEN.SUCCESS,
      failed: ACTIONS.FETCH_CACHE_TOKEN.FAILED,
      dispatch
    })
    .then(successAction => successAction.payload.token)
    .catch(errorAction => Promise.reject(new Error("No Token available")));
};

const fetchUser = async action => async dispatch => {
  try {
    const db = firebase.firestore();
    const doc = await db
      .collection("users")
      .doc(action.payload.uid)
      .get();
    if (doc.exists) {
      return dispatch.user.fetchUserSuccess(doc.data());
    }
    return dispatch.user.fetchUserFailed("Unable to get user data");
  } catch (error) {
    return dispatch.user.fetchUserFailed(error.message);
  }
};

export default {
  fetchUser,
  fetchCacheToken,
  remoteCacheToken,
  login
};
