import { types, actions, browser } from '@diff/common';
import normalizeUrl from 'normalize-url';
import _ from 'lodash-es';
import { getUserDomains } from './user';
import { storeUserToken, getUserToken, getSitePreference } from './storage';

/**
 *
 * @param {Number} tabId
 * @param {Object} postMessageToTab
 */
const handleFetchUserPreferences = async (tabId, postMessageToTab, action) => {
  try {
    // if we dont have a token, domains arent available
    const value = await getUserToken();
    if (_.isNil(value) || !value.token) {
      return postMessageToTab(tabId, actions.fetchUserPreferencesFailed());
    }

    const remoteSites = await getUserDomains();
    // get the local sites theyve opened diff for
    const localSites = await getSitePreference();

    const sites = _.uniq(
      _.union(remoteSites.domains, localSites).map(
        url => new URL(normalizeUrl(url)).hostname
      )
    );

    const { featureFlags = {} } = await browser.storage.local.get([
      'featureFlags'
    ]);

    if (_.indexOf(sites, action.payload.hostname) !== -1) {
      // combine and send back
      return postMessageToTab(
        tabId,
        actions.fetchUserPreferencesSuccess({ featureFlags })
      );
    }

    return postMessageToTab(tabId, actions.fetchCacheTokenFailed());
  } catch (err) {
    postMessageToTab(tabId, actions.fetchUserPreferencesFailed(err.message));
  }
};

const handleCacheTokenRequest = async (tabId, postMessageToTab, action) => {
  storeUserToken(action.payload.token)
    .then(() => postMessageToTab(tabId, actions.cacheTokenSuccess()))
    .catch(() =>
      postMessageToTab(tabId, actions.cacheTokenFailed('Not able to save'))
    );
};

const handleFetchCacheTokenRequest = async (tabId, postMessageToTab) => {
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
      actions.fetchCacheTokenFailed('No Token Set')
    );
  } catch (err) {
    postMessageToTab(tabId, actions.fetchCacheTokenFailed(err));
  }
};

export default {
  [types.FETCH_USER_PREFERENCES.REQUEST]: handleFetchUserPreferences,
  [types.CACHE_TOKEN.REQUEST]: handleCacheTokenRequest,
  [types.FETCH_CACHE_TOKEN.REQUEST]: handleFetchCacheTokenRequest
};
