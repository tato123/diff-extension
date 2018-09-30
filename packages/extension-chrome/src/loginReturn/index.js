import auth0 from 'auth0-js';
import browser from '@diff/common/dist/browser';

const webAuth = new auth0.WebAuth({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID
});

// Access our values

async function parseHash(state, nonce) {
  return new Promise((resolve, reject) => {
    webAuth.parseHash(
      { hash: window.location.hash, state, nonce },
      (err, authResult) => {
        if (err) {
          return reject(err);
        }
        return resolve(authResult);
      }
    );
  });
}

async function getActiveTab(options) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(options, activeTabs => {
      if (activeTabs.length > 0) {
        return resolve(activeTabs);
      }
      return reject(activeTabs);
    });
  });
}

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
    .then(({ firebaseToken }) => browser.storage.local.set({ firebaseToken }));
}

async function onLogin() {
  try {
    const { state, nonce, loginReturnUrl } = await browser.storage.local.get([
      'loginReturnUrl',
      'state',
      'nonce'
    ]);

    const authResult = await parseHash(state, nonce);

    // set our entire auth result
    await browser.storage.local.set(authResult);
    // do the same for a firebase token
    await exchangeAndStoreFirebaseToken(authResult.idToken);

    const activeTabs = await getActiveTab({
      active: true,
      currentWindow: true
    });

    chrome.tabs.update(activeTabs[0].id, {
      url: loginReturnUrl || `${process.env.WEB_HOME}/support`
    });
  } catch (error) {
    const activeTabs = await getActiveTab({
      active: true,
      currentWindow: true
    });

    chrome.tabs.update(activeTabs[0].id, {
      url: `${process.env.WEB_HOME}/support`
    });
  }
}

onLogin();
