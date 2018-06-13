import {
  CONTENT_SCRIPT_PORT_NAME,
  CONTENT_SCRIPT_SOURCE_NAME,
  BACKGROUND_SCRIPT_PORT_NAME
} from "../common/keys";

/**
 * @param {*} scriptName
 * @param {*} scriptId
 */
const addScriptToPage = async (scriptName, scriptId) => {
  return new Promise((resolve, reject) => {
    // only add the scripts if they aren't already on the page
    const elm = document.querySelector(`#${scriptId}`);
    if (elm) {
      return resolve();
    }

    // Add our page bridge
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL(scriptName);
    script.onload = resolve;
    script.onerror = reject;
    script.id = scriptId;
    document.body.appendChild(script);
  });
};

const port = chrome.runtime.connect({ name: CONTENT_SCRIPT_PORT_NAME });

port.onMessage.addListener(async msg => {
  if (msg.source === BACKGROUND_SCRIPT_PORT_NAME) {
    await addScriptToPage("frontend.js", "df-bridge-0123");
    const element = document.createElement("df-login");
    document.body.appendChild(element);
  }
});

function sendMessage(message, cb) {
  port.postMessage(message, cb);
}

const handleUnknownmessageSource = evt => {
  if (process.env.NODE_ENV === "development") {
    // console.warn("Unknown message source", evt);
  }
};

const handleMessageFromBackend = evt => {
  console.log("message received from backend", evt);
};

const handleMessageFromFrontend = (evt, sendResponse) => {
  const { data } = evt;
  switch (data.type) {
    case "@diff/user/get/request":
      sendMessage({ type: "GET_AUTH_TOKEN", source: "diff" }, response => {
        sendResponse({
          payload: response,
          type: `@diff/user/get/${response === "" ? "success" : "failed"}`
        });
      });
      break;
    default:
      if (process.env.NODE_ENV === "development") {
        console.warn("Unhandled message type from frontend", data.type);
      }
  }
};

const respondToSource = source => data => {
  const modifiedData = {
    ...data,
    source
  };
  window.postMessage(modifiedData, "*");
};

const handleMessagesReceived = evt => {
  const { data } = evt;

  if (data.source) {
    switch (data.source) {
      case "@diff/frontend":
        handleMessageFromFrontend(
          evt,
          respondToSource(CONTENT_SCRIPT_SOURCE_NAME)
        );
        break;
      case "@diff/backend":
        handleMessageFromBackend(
          evt,
          respondToSource(CONTENT_SCRIPT_SOURCE_NAME)
        );
        break;
      default:
        handleUnknownmessageSource(evt);
    }
  }
};

/**
 * Configure our messaging
 */
window.addEventListener("message", handleMessagesReceived, false);

/**
 *
 */
const loadScripts = async () => {
  await addScriptToPage("frontend.js", "df-bridge-0123");
};

const getDomainsList = async () => {
  return new Promise((resolve, reject) => {
    sendMessage({ type: "GET_DOMAIN_LIST", source: "diff" }, response => {
      console.log("whitelist response", response);
      resolve(response);
    });
  });
};

const isWhitelistedDomain = domains => {
  return !!domains.find(x => x === window.location.hostname);
};

/**
 * Configure our script to startup
 */
const startup = async () => {
  try {
    // check if we can run on this domain
    const domains = await getDomainsList();

    // domain type
    if (isWhitelistedDomain(domains)) {
      loadScripts();
    }
  } catch (err) {
    console.log(err);
  }
};

// start our applicaiton
startup();
