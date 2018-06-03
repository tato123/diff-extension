const whitelist = ["storage.googleapis.com"];

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
        sendResponse();
        break;
      default:
        sendResponse({ err: "No action found for request", request });
    }
  }
});
