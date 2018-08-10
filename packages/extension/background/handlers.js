import {
  get,
  set,
  storeUserToken,
  getUserToken,
  rememberUserClickedSite
} from "./storage";
import { login } from "./user";
import _ from "lodash";
import { types, actions } from "@diff/common";
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
    const { firestore, token } = await login(refreshToken);

    // grab the first account
    const account = _.first(_.keys(token.claims.accounts));

    // get the remote domains
    const querySnapshot = await firestore
      .collection("events")
      .where("meta.userId", "==", token.uid)
      .get();
    let sites = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      sites = _.union(sites, [data.url]);
    });

    // get the local sites theyve opened diff for
    const localSites = await rememberUserClickedSite();

    preferences.autorunDomains = _.union(sites, localSites);

    // combine and send back
    postMessageToTab(tabId, actions.fetchUserPreferencesSuccess(preferences));
  } catch (err) {
    postMessageToTab(tabId, actions.fetchUserPreferencesFailed(err.message));
  }
};

const handlStoreUserPreferences = (
  tabId,
  postMessageToTab,
  { payload: { preferences } }
) => {
  set(PREFERENCES, preferences)
    .then(() => postMessageToTab(tabId, actions.storeUserPreferencesSuccess()))
    .catch(err =>
      postMessageToTab(tabId, actions.storeUserPreferencesFailed(err.message))
    );
};

const handleCacheTokenRequest = (tabId, postMessageToTab, action) => {
  storeUserToken(action.payload.token)
    .then(() => postMessageToTab(tabId, actions.cacheTokenSuccess()))
    .catch(() =>
      postMessageToTab(tabId, actions.cacheTokenFailed("Not able to save"))
    );
};

const handleFetchCacheTokenRequest = (tabId, postMessageToTab, action) => {
  getUserToken()
    .then(value =>
      postMessageToTab(tabId, actions.fetchCacheTokenSuccess(value.token))
    )
    .catch(() =>
      postMessageToTab(
        tabId,
        actions.fetchCacheTokenSuccess("No token available")
      )
    );
};

export default {
  [types.FETCH_USER_PREFERENCES.REQUEST]: handleFetchUserPreferences,
  [types.STORE_USER_PREFERENCES.REQUEST]: handlStoreUserPreferences,
  [types.CACHE_TOKEN.REQUEST]: handleCacheTokenRequest,
  [types.FETCH_CACHE_TOKEN.REQUEST]: handleFetchCacheTokenRequest
};
