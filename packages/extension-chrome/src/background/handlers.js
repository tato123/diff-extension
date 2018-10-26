import {
  types,
  actions,
  browser,
  AuthProvider,
  remoteSettings
} from '@diff/common';
import normalizeUrl from 'normalize-url';
import _ from 'lodash-es';
import jwtDecode from 'jwt-decode';
import { getSitePreference } from './storage';

/**
 *
 * @param {Number} tabId
 * @param {Object} postMessageToTab
 */
const handleFetchUserPreferences = async (tabId, postMessageToTab, action) => {
  try {
    const user = await browser.auth.getUser();
    const remoteSites = await remoteSettings.getDomains(user.sub);

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

async function getFirebaseToken() {
  const { firebaseToken: oldToken } = await browser.storage.html5.local.get([
    'firebaseToken'
  ]);

  const valid = oldToken ? jwtDecode(oldToken).exp > Date.now() / 1000 : false;
  if (oldToken && valid) {
    return oldToken;
  }

  return browser.auth.getFirebaseToken().then(async ({ firebaseToken }) => {
    await browser.storage.html5.local.set({ firebaseToken });
    return firebaseToken;
  });
}

const handleGetFirebaseToken = async (tabId, postMessageToTab) => {
  try {
    // do the same for a firebase token
    const firebaseToken = await getFirebaseToken();

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
        error: 'Unable to get a new firebase token'
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
