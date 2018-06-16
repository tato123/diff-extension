import { ACTIONS } from "@diff/common/keys";
import * as actionCreator from "@diff/common/actions";
import { get, set, storeUserToken, getUserToken } from "./storage";

const PREFERENCES = "_DIFF_PREFERENCES";

const handleFetchUserPreferences = (tabId, postMessageToTab) => {
  get(PREFERENCES)
    .then(preferences =>
      postMessageToTab(
        tabId,
        actionCreator.fetchUserPreferencesSuccess(preferences)
      )
    )
    .catch(err =>
      postMessageToTab(
        tabId,
        actionCreator.fetchUserPreferencesFailed(err.message)
      )
    );
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
    .then(() => postMessageToTab(tabId, actionCreator.fetchCacheTokenFailed()))
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
