import { sources, actions } from '@diff/common';
import Auth0Chrome from 'auth0-chrome';
import { addSitePreference, storeUserToken } from './storage';

import { postMessageToTab } from './postmessage';

import { registerPort, removeListener, messageListener } from './ports';

const settings = {
  AUTH0_DOMAIN: 'diff.auth0.com',
  AUTH0_CLIENT_ID: 'hza50RUb2qA-F5dZ4cuBVH324yMzuURc'
};

chrome.runtime.onConnect.addListener(port => {
  if (port.name === sources.CONTENT_SCRIPT_PORT_NAME) {
    // add me to the ports list
    const id = registerPort(port);

    // receive a message
    port.onMessage.addListener(messageListener(id));

    // disconnect a particular subject
    port.onDisconnect.addListener(removeListener(id));
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'diff-inspect',
    title: 'Inspect with diff',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  // only remember the site if we have a token
  addSitePreference(tab.url);

  postMessageToTab(tab.id, actions.runRequest());
  return true;
});

chrome.browserAction.onClicked.addListener(tab => {
  // remember the user clicked this site
  addSitePreference(tab.url);

  postMessageToTab(tab.id, actions.runRequest());
  return true;
});

chrome.runtime.onMessage.addListener(event => {
  if (event.type === 'authenticate') {
    // scope
    //  - openid if you want an ID Token returned
    //  - offline_access if you want a Refresh Token returned
    // device
    //  - required if requesting the offline_access scope.
    const options = {
      scope: 'openid offline_access profile',
      device: 'chrome-extension'
    };

    new Auth0Chrome(settings.AUTH0_DOMAIN, settings.AUTH0_CLIENT_ID)
      .authenticate(options)
      .then(authResult => {
        localStorage.authResult = JSON.stringify(authResult);
        chrome.notifications.create({
          type: 'basic',
          iconUrl: '../images/icon_128.png',
          title: 'Login Successful',
          message: 'You can use the app now'
        });
      })
      .catch(err => {
        chrome.notifications.create({
          type: 'basic',
          title: 'Login Failed',
          message: err.message,
          iconUrl: '../images/icon_128.png'
        });
      });
  }
});

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    switch (request.type) {
      case 'FORCE_INJECT':
        chrome.tabs.executeScript(sender.tab.id, {
          file: 'contentScript.js'
        });
        sendResponse({ type: 'FORCE_INJECT_SUCCESS' });
        break;
      case 'VERIFY_INSTALLED':
        sendResponse({
          type: 'VERIFY_INSTALLED_SUCCESS',
          payload: { verion: null }
        });
        break;
      case 'STORE_TOKEN':
        const {
          payload: { refreshToken }
        } = request;
        console.log('Received store token request', refreshToken);
        storeUserToken(refreshToken)
          .then(() => {
            console.log('Completed successfully');
            sendResponse({
              type: 'STORE_TOKEN_SUCCESS'
            });
          })
          .catch(error => {
            console.log('Errored', error);
            sendResponse({
              type: 'STORE_TOKEN_FAILED'
            });
          });

        break;
      default:
    }
    return true;
  }
);
