import { types, actions, browser } from '@diff/common';
import normalizeUrl from 'normalize-url';
import _ from 'lodash-es';
import { getUserDomains } from './user';
import { getUserToken, getSitePreference } from './storage';

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
  } catch (error) {
    postMessageToTab(tabId, actions.fetchUserPreferencesFailed(error.message));
    return error;
  }
};

async function exchangeAndStoreFirebaseToken(token) {
  return fetch(`${process.env.API_SERVER}/auth/firebase`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.statusText);
    })
    .then(({ firebaseToken }) => firebaseToken);
}

const handleGetFirebaseToken = async (tabId, postMessageToTab) => {
  try {
    const { idToken } = await browser.storage.html5.local.get(['idToken']);

    // do the same for a firebase token
    const firebaseToken = await exchangeAndStoreFirebaseToken(idToken);

    if (!_.isNil(firebaseToken)) {
      return postMessageToTab(tabId, {
        type: types.GET_FIREBASE_TOKEN.SUCCESS,
        payload: {
          firebaseToken
        }
      });
    }
    return postMessageToTab(tabId, {
      type: types.GET_FIREBASE_TOKEN.FAILED,
      payload: {
        error: 'No token'
      }
    });
  } catch (error) {
    postMessageToTab(tabId, {
      type: types.GET_FIREBASE_TOKEN.FAILED,
      payload: { error: error.message }
    });
    return error;
  }
};

export default {
  [types.FETCH_USER_PREFERENCES.REQUEST]: handleFetchUserPreferences,
  [types.GET_FIREBASE_TOKEN.REQUEST]: handleGetFirebaseToken
};
