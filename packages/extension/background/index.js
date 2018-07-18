import {
  CONTENT_SCRIPT_PORT_NAME,
  CONTENT_SCRIPT_SOURCE_NAME,
  BACKGROUND_SCRIPT_PORT_NAME,
  MESSAGES_FRONTEND_SOURCE
} from "@diff/common/keys";
import handlers from "./handlers";
import { runRequest, composeRemoteAction } from "@diff/common/actions";

import firebase from "firebase";

// connect to firebase
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID
};
firebase.initializeApp(config);

// all of our tabs in the browser
const ports = {};

/**
 * Handles storing the port object in memory
 *
 * @param {Object} port - port object provided by chrome
 */
const registerPort = port => {
  const id = port.sender.tab.id;

  if (id in ports) {
    console.warn("Overwriting tab id", id);
  }
  ports[id] = port;
  return port.sender.tab.id;
};

/**
 * Generalized listener for all chrome messages that then applies
 * some sort of handler specified in handlers
 */
const messageListener = tabId => msg => {
  const postDestContentScript = postMessageToTabWithDestination(
    CONTENT_SCRIPT_SOURCE_NAME
  );
  const postDestFrontend = postMessageToTabWithDestination(
    MESSAGES_FRONTEND_SOURCE
  );

  if (msg.source === CONTENT_SCRIPT_SOURCE_NAME && msg.type in handlers) {
    handlers[msg.type](tabId, postDestContentScript, msg);
  } else if (msg.source === MESSAGES_FRONTEND_SOURCE && msg.type in handlers) {
    handlers[msg.type](tabId, postDestFrontend, msg);
  } else {
    postDestContentScript(tabId, {
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
  postMessageToTabWithDestination(CONTENT_SCRIPT_SOURCE_NAME)(tabId, message);
};

/**
 * Allows us to message a particular Tab
 * @param {*} tabId
 * @param {*} message
 */
const postMessageToTabWithDestination = destination => (tabId, message) => {
  const port = portForId(tabId);
  if (!port) {
    console.error("Unable to post message");
    return;
  }
  port.postMessage(
    composeRemoteAction(message, BACKGROUND_SCRIPT_PORT_NAME, destination)
  );
};

/**
 * Handle our initial connection from content scripts
 */
const handleOnConnect = port => {
  if (port.name === CONTENT_SCRIPT_PORT_NAME) {
    // add me to the ports list
    const id = registerPort(port);
    port.onMessage.addListener(messageListener(id));
    port.onDisconnect.addListener(removeListener(id));
  }
};

/**
 * Create a context menu items to allow encode/decode
 */
const handleOnInstalled = () => {
  chrome.contextMenus.create({
    id: "log-selection",
    title: "Inspect with diff",
    contexts: ["all"]
  });
};

const handleOnContextMenuClicked = (info, tab) => {
  postMessageToTab(tab.id, runRequest());
  return true;
};

const handleOnBrowserActionClicked = tab => {
  postMessageToTab(tab.id, runRequest());
  return true;
};

chrome.runtime.onConnect.addListener(handleOnConnect);
chrome.runtime.onInstalled.addListener(handleOnInstalled);
chrome.contextMenus.onClicked.addListener(handleOnContextMenuClicked);
chrome.browserAction.onClicked.addListener(handleOnBrowserActionClicked);
