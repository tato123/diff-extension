import { types, actions, browser } from '@diff/common';

import _ from 'lodash-es';
import jwtDecode from 'jwt-decode';

import getUserProfile from './handlers/getUserProfile';

const handleFetchUserPreferences = async (tabId, postMessageToTab, action) => {
  try {
    const userprofile = await getUserProfile();

    if (_.indexOf(userprofile.sites, action.payload.hostname) !== -1) {
      // combine and send back
      return postMessageToTab(
        tabId,
        actions.fetchUserPreferencesSuccess(userprofile)
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
