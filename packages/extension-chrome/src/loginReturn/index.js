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

async function routeError(error = 'unknown error') {
  console.error(error);
  const activeTabs = await getActiveTab({
    active: true,
    currentWindow: true
  });

  chrome.tabs.update(activeTabs[0].id, {
    url: `${process.env.WEB_HOME}/support`
  });
}

async function handleAuthResult(authResult) {
  try {
    const { loginReturnUrl } = await browser.storage.local.get([
      'loginReturnUrl'
    ]);

    chrome.browserAction.setIcon({ path: '../images/icon_128.png' });

    // set our entire auth result
    await browser.storage.html5.local.set(authResult);

    const activeTabs = await getActiveTab({
      active: true,
      currentWindow: true
    });

    chrome.tabs.update(activeTabs[0].id, {
      url: loginReturnUrl || `${process.env.WEB_HOME}/support`
    });
  } catch (error) {
    routeError(error);
  }
}

async function onLogin() {
  const { state, nonce } = await browser.storage.local.get(['state', 'nonce']);

  const authResult = await parseHash(state, nonce);
  handleAuthResult(authResult);
}

// onLogin();

async function exchangeCode() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('code')) {
    const response = await fetch(
      `${process.env.API_SERVER}/auth/codeGrant?code=${urlParams.get(
        'code'
      )}&redirectUri=${window.location.href}`
    );
    if (response.ok) {
      const authResult = await response.json();
      handleAuthResult(authResult);
    } else {
      routeError();
    }
  }
}

exchangeCode();
