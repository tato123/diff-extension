import { sources, actions } from '@diff/common';
import { addSitePreference, storeUserToken } from './storage';

import { postMessageToTab } from './postmessage';

import { registerPort, removeListener, messageListener } from './ports';

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
