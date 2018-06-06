import { CONTENT_SCRIPT_PORT_NAME } from "../common/keys";

const whitelist = ["storage.googleapis.com"];

const ports = {};

function getUserToken() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["_diff_userToken_"], (result = "") => {
      resolve(Object.keys(result).length === 0 ? "" : result);
    });
  });
}

const registerPort = port => {
  const id = port.sender.tab.id;

  if (id in ports) {
    console.warn("Overwriting tab id", id);
  }
  ports[id] = port;
  return port.sender.tab.id;
};

const messageListener = tabId => msg => {};

const removeListener = tabId => () => {
  if (tabId in ports) {
    delete ports[tabId];
  }
};

const portForId = tabId => {
  return ports[tabId];
};

const portMessageForTab = (tabId, message) => {
  const port = portForId(tabId);
  if (!port) {
    console.error("Unable to post message");
    return;
  }
  port.postMessage(
    Object.assign(
      {},
      {
        source: "@diff/backend"
      },
      message
    )
  );
};

chrome.runtime.onConnect.addListener(port => {
  if (port.name === CONTENT_SCRIPT_PORT_NAME) {
    // add me to the ports list
    const id = registerPort(port);
    port.onMessage.addListener(messageListener(id));
    port.onDisconnect.addListener(removeListener(id));
  }
});

/**
 * Handles messages from our content scripts
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.source === "diff") {
    switch (request.type) {
      case "GET_DOMAIN_LIST":
        sendResponse(whitelist);
        break;
      case "GET_AUTH_TOKEN":
        getUserToken()
          .then(sendResponse)
          .catch(_ => sendResponse("error"));
        break;
      default:
        sendResponse({ err: "No action found for request", request });
    }
  }
  return true;
});

/**
 * Create a context menu items to allow encode/decode
 */
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "log-selection",
    title: "Inspect with diff",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log("clickster");
  try {
    const token = await getUserToken();
    if (!token) {
      portMessageForTab(tab.id, { type: "@diff/AUTHENTICATION_REQUEST" });
    } else {
      console.log("logged in");
    }
  } catch (err) {}

  return true;
});
