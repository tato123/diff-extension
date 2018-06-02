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

const loadScripts = async () => {
  await addScriptToPage("frontend.js", "df-bridge-0123");
};

// perform our check at document_start
chrome.runtime.sendMessage({ type: "diff:is_whitelisted" }, response => {
  console.log("Content script", response);
  if (response.whitelisted) {
    loadScripts();
  }
});
