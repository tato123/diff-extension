import browser from '@diff/common/dist/browser';
import auth0 from 'auth0-js';

const auth0Proivder = new auth0.WebAuth({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  responseType: 'token'
});

/**
 * Chrome implementation of checking and renewing a session.
 * This method very purposefully manages the side effects of
 * setting the chrome browseraction icon in addition to checking the
 * session.
 *
 */
export const checkAndRenewSession = async () => {
  try {
    // get an access token
    const { access_token, id_token } = await browser.auth.checkSession();

    if (access_token == null) {
      // attempt to renew the access token
      const response = await browser.auth.renewSession();
      const authResult = await response.json();

      browser.storage.html5.local.set({ ...authResult });
      chrome.browserAction.setIcon({ path: '../images/icon_128.png' });

      return {
        access_token: authResult.access_token,
        id_token: authResult.id_token
      };
    }
    return { access_token, id_token };
  } catch (error) {
    // no token has been set at all
    console.error('[#checkAndRenewSession] - error checking session', error);
    chrome.browserAction.setIcon({ path: '../images/inactive_icon_128.png' });
    throw new Error(`[#checkAndRenewSession] session is invalid${  error}`);
  }
};

export const authProvider = () => auth0Proivder;
