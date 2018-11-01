import auth0 from 'auth0-js';
import browser from '../browser';

export default class Authentication {
  constructor(domain, clientID) {
    this.auth = new auth0.WebAuth({
      domain,
      clientID,
      responseType: 'token',
      scope: 'openid profile email offline_access'
    });
  }

  /**
   * Chrome implementation of checking and renewing a session.
   * This method very purposefully manages the side effects of
   * setting the chrome browseraction icon in addition to checking the
   * session.
   *
   */
  checkAndRenewSession = async () => {
    try {
      // get an access token
      const { access_token, id_token } = await browser.auth.checkSession();

      if (access_token == null) {
        // attempt to renew the access token
        const response = await browser.auth.renewSession();
        const authResult = await response.json();

        browser.storage.html5.local.set({ ...authResult });

        if (chrome) {
          chrome.browserAction.setIcon({ path: '../images/icon_128.png' });
        }

        return {
          access_token: authResult.access_token,
          id_token: authResult.id_token
        };
      }
      return { access_token, id_token };
    } catch (error) {
      // no token has been set at all
      console.error('[#checkAndRenewSession] - error checking session', error);

      if (chrome) {
        chrome.browserAction.setIcon({
          path: '../images/inactive_icon_128.png'
        });
      }

      throw new Error(`[#checkAndRenewSession] session is invalid${error}`);
    }
  };

  getUserProfile = async accessToken =>
    new Promise((resolve, reject) => {
      this.auth.client.userInfo(accessToken, (err, user) => {
        if (err) {
          return reject(new Error(err));
        }
        return resolve(user);
      });
    });
}
