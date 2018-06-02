const whitelist = ["storage.googleapis.com"];

/**
 * Handles messages from our content scripts
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { hostname } = new URL(sender.tab.url);

  // is whitelisted
  const whitelisted = !!whitelist.find(x => x === hostname);
  if (request.type === "diff:is_whitelisted" && whitelisted) {
    sendResponse({ whitelisted });
  }
});
