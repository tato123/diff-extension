import {
  get,
  set,
  storeUserToken,
  getUserToken,
  rememberUserClickedSite
} from "./storage";
import { getRemoteDomains, invalidateToken } from "./user";
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
    const sites = await getRemoteDomains();

    // get the local sites theyve opened diff for
    const localSites = await rememberUserClickedSite();

    preferences.autorunDomains = _.union(sites, localSites);

    // combine and send back
    postMessageToTab(tabId, actions.fetchUserPreferencesSuccess(preferences));
  } catch (err) {
    postMessageToTab(tabId, actions.fetchUserPreferencesFailed(err.message));
  }
};

const handleStoreUserPreferences = (
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

const handleCacheTokenRequest = async (tabId, postMessageToTab, action) => {
  const previousToken = await getUserToken();
  const nextToken = action.payload.token;

  if (
    previousToken &&
    previousToken.token &&
    previousToken.token === nextToken
  ) {
    postMessageToTab(tabId, actions.cacheTokenSuccess());
    return;
  } else if (
    previousToken &&
    previousToken.token &&
    previousToken.token !== nextToken
  ) {
    invalidateToken();
  }

  storeUserToken(action.payload.token)
    .then(() => postMessageToTab(tabId, actions.cacheTokenSuccess()))
    .catch(() =>
      postMessageToTab(tabId, actions.cacheTokenFailed("Not able to save"))
    );
};

const handleFetchCacheTokenRequest = async (
  tabId,
  postMessageToTab,
  action
) => {
  try {
    const value = await getUserToken();
    if (!_.isNil(value)) {
      return postMessageToTab(
        tabId,
        actions.fetchCacheTokenSuccess(value.token)
      );
    }
    return postMessageToTab(
      tabId,
      actions.fetchCacheTokenFailed("No Token Set")
    );
  } catch (err) {
    postMessageToTab(tabId, actions.fetchCacheTokenFailed(err));
  }
};

export default {
  [types.FETCH_USER_PREFERENCES.REQUEST]: handleFetchUserPreferences,
  [types.STORE_USER_PREFERENCES.REQUEST]: handleStoreUserPreferences,
  [types.CACHE_TOKEN.REQUEST]: handleCacheTokenRequest,
  [types.FETCH_CACHE_TOKEN.REQUEST]: handleFetchCacheTokenRequest
};
