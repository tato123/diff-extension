import {
  CONTENT_SCRIPT_PORT_NAME,
  CONTENT_SCRIPT_SOURCE_NAME
} from "../common/keys";
import { getUserToken } from "./token";
import handlers from "./handlers";
import { forceRun, composeRemoteAction } from "./actions";

const ports = {};

const registerPort = port => {
  const id = port.sender.tab.id;

  if (id in ports) {
    console.warn("Overwriting tab id", id);
  }
  ports[id] = port;
  return port.sender.tab.id;
};

const messageListener = tabId => msg => {
  if (msg.source === CONTENT_SCRIPT_SOURCE_NAME && msg.type in handlers) {
    handlers[msg.type](tabId, postMessageToTab, msg);
  } else {
    postMessageToTab(tabId, {
      err: "No action found for request"
    });
  }
};

const removeListener = tabId => () => {
  if (tabId in ports) {
    delete ports[tabId];
  }
};

const portForId = tabId => {
  return ports[tabId];
};

/**
 * Allows us to message a particular Tab
 * @param {*} tabId
 * @param {*} message
 */
const postMessageToTab = (tabId, message) => {
  const port = portForId(tabId);
  if (!port) {
    console.error("Unable to post message");
    return;
  }
  port.postMessage(composeRemoteAction(message));
};

/**
 * Handle our initial connection from content scripts
 */
chrome.runtime.onConnect.addListener(port => {
  if (port.name === CONTENT_SCRIPT_PORT_NAME) {
    // add me to the ports list
    const id = registerPort(port);
    port.onMessage.addListener(messageListener(id));
    port.onDisconnect.addListener(removeListener(id));
  }
});

/**
 * Create a context menu items to allow encode/decode
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "log-selection",
    title: "Inspect with diff",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const token = await getUserToken();
  postMessageToTab(tab.id, forceRun(token));
  return true;
});
