import {
  CONTENT_SCRIPT_PORT_NAME,
  BACKGROUND_SCRIPT_PORT_NAME,
  CONTENT_SCRIPT_SOURCE_NAME,
  ACTIONS
} from "../common/keys";

const ports = {};

const getUserToken = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["_diff_userToken_"], (result = "") => {
      resolve(Object.keys(result).length === 0 ? null : result);
    });
  });
};

const registerPort = port => {
  const id = port.sender.tab.id;

  if (id in ports) {
    console.warn("Overwriting tab id", id);
  }
  ports[id] = port;
  return port.sender.tab.id;
};

const messageListener = tabId => msg => {
  if (msg.source === CONTENT_SCRIPT_SOURCE_NAME) {
    switch (msg.type) {
      case ACTIONS.VALIDATE_CAN_RUN.REQUEST:
        getUserToken()
          .then(user => {
            if (user == null) {
              throw new Error("No user token available");
            }
            return user;
          })
          .then(user => {
            // do something
            postMessageToTab(tabId, {
              type: ACTIONS.VALIDATE_CAN_RUN.FAILED,
              payload: {
                err: "Method not implemented"
              }
            });
          })
          .catch(err =>
            postMessageToTab(tabId, {
              type: ACTIONS.VALIDATE_CAN_RUN.FAILED,
              payload: {
                err: err.message
              }
            })
          );
        break;
      default:
        postMessageToTab(tabId, {
          err: "No action found for request",
          msg
        });
    }
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
  port.postMessage(
    Object.assign(
      {},
      {
        source: BACKGROUND_SCRIPT_PORT_NAME
      },
      message
    )
  );
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
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "log-selection",
    title: "Inspect with diff",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const token = await getUserToken();

  postMessageToTab(tab.id, {
    type: ACTIONS.RUN_REQUEST.REQUEST,
    payload: {
      context: {
        token
      }
    }
  });

  return true;
});
