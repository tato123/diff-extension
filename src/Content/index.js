const addScriptToPage = async scriptName => {
  return new Promise((resolve, reject) => {
    // Add our page bridge
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL(scriptName);
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const loadScripts = async () => {
  //await addScriptToPage("bridge.js");
  await addScriptToPage("app.js");
};

loadScripts();
