// perform our check at document_start
chrome.runtime.sendMessage({ type: "diff:is_whitelisted" });
