import { sources } from '@diff/common';
import { addSitePreference, storeUserToken } from './storage';

import { registerPort, removeListener, messageListener } from './ports';
import getUserProfile from './handlers/getUserProfile';

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

// one time message from things like popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'run_request' && request.source === 'popup') {
    const { tab } = request;

    // remember the user clicked this site
    addSitePreference(tab.url);

    // force run the script
    chrome.tabs.executeScript(tab.id, {
      file: 'js/contentScript.js'
    });

    sendResponse({ type: 'run_request_success' });
  } else if (request.type === 'get_profile' && request.source === 'popup') {
    getUserProfile().then(profile => {
      sendResponse({ type: 'get_profile_success', profile });
    });
  }
  return true;
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
