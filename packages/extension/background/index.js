import { addSitePreference } from "./storage";

import { postMessageToTab } from "./postmessage";

import { registerPort, removeListener, messageListener } from "./ports";
import { sources, actions } from "@diff/common";

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
    id: "diff-inspect",
    title: "Inspect with diff",
    contexts: ["all"]
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
