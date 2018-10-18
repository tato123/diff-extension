import handlers from './handlers';
import { postMessageToTabWithDestination } from './postmessage';
import { sources } from '@diff/common';

// all of our tabs in the browser
const ports = {};

/**
 * Handles storing the port object in memory
 *
 * @param {Object} port - port object provided by chrome
 */
export const registerPort = port => {
  const id = port.sender.tab.id;

  if (id in ports) {
    console.warn('Overwriting tab id', id);
  }
  ports[id] = port;
  return port.sender.tab.id;
};

export const removeListener = tabId => () => {
  if (tabId in ports) {
    delete ports[tabId];
  }
};

export const portForId = tabId => {
  return ports[tabId];
};

/**
 * Generalized listener for all chrome messages that then applies
 * some sort of handler specified in handlers
 */
export const messageListener = tabId => msg => {
  const postDestContentScript = postMessageToTabWithDestination(
    sources.CONTENT_SCRIPT_SOURCE_NAME
  );

  const postDestFrontend = postMessageToTabWithDestination(
    sources.MESSAGES_FRONTEND_SOURCE
  );

  if (
    msg.source === sources.CONTENT_SCRIPT_SOURCE_NAME &&
    msg.type in handlers
  ) {
    handlers[msg.type](tabId, postDestContentScript, msg);
  } else if (
    msg.source === sources.MESSAGES_FRONTEND_SOURCE &&
    msg.type in handlers
  ) {
    handlers[msg.type](tabId, postDestFrontend, msg);
  } else {
    postDestContentScript(tabId, {
      err: 'No action found for request'
    });
  }
};
