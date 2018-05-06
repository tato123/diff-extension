/**
 * Handle user event when a Tab is clicked
 */
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: "contentScript.js"
  });
  chrome.tabs.executeScript({
    file: "watcher.js"
  });
});
