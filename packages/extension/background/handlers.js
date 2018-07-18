import { ACTIONS } from "@diff/common/keys";
import * as actionCreator from "@diff/common/actions";
import { get, set, storeUserToken, getUserToken } from "./storage";
import { login } from "./user";
import _ from "lodash";
const PREFERENCES = "_DIFF_PREFERENCES";

/**
 *
 * @param {Number} tabId
 * @param {Object} postMessageToTab
 */
const handleFetchUserPreferences = async (tabId, postMessageToTab) => {
  try {
    // get the user preferences
    const preferences = await get(PREFERENCES, {});
    const { token: refreshToken } = await getUserToken();
    const firestore = await login(refreshToken);

    // get the remote domains
    const querySnapshot = await firestore.collection("events").get();
    let sites = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      sites = _.union(sites, [data.url]);
    });
    preferences.autorunDomains = sites;
    // get the local sites theyve opened diff for

    // combine and send back
    postMessageToTab(
      tabId,
      actionCreator.fetchUserPreferencesSuccess(preferences)
    );
  } catch (err) {
    postMessageToTab(
      tabId,
      actionCreator.fetchUserPreferencesFailed(err.message)
    );
  }
};

const handlStoreUserPreferences = (
  tabId,
  postMessageToTab,
  { payload: { preferences } }
) => {
  set(PREFERENCES, preferences)
    .then(() =>
      postMessageToTab(tabId, actionCreator.storeUserPreferencesSuccess())
    )
    .catch(err =>
      postMessageToTab(
        tabId,
        actionCreator.storeUserPreferencesFailed(err.message)
      )
    );
};

const handleCacheTokenRequest = (tabId, postMessageToTab, action) => {
  storeUserToken(action.payload.token)
    .then(() => postMessageToTab(tabId, actionCreator.cacheTokenSuccess()))
    .catch(() =>
      postMessageToTab(
        tabId,
        actionCreator.cacheTokenFailed("Not able to save")
      )
    );
};

const handleFetchCacheTokenRequest = (tabId, postMessageToTab, action) => {
  getUserToken()
    .then(value =>
      postMessageToTab(tabId, actionCreator.fetchCacheTokenSuccess(value.token))
    )
    .catch(() =>
      postMessageToTab(
        tabId,
        actionCreator.fetchCacheTokenSuccess("No token available")
      )
    );
};

export default {
  [ACTIONS.FETCH_USER_PREFERENCES.REQUEST]: handleFetchUserPreferences,
  [ACTIONS.STORE_USER_PREFERENCES.REQUEST]: handlStoreUserPreferences,
  [ACTIONS.CACHE_TOKEN.REQUEST]: handleCacheTokenRequest,
  [ACTIONS.FETCH_CACHE_TOKEN.REQUEST]: handleFetchCacheTokenRequest
};
