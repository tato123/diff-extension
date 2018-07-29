/**
 * @param {*} scriptName
 * @param {*} scriptId
 */
export const addScriptToPage = async (scriptName, scriptId) => {
  return new Promise((resolve, reject) => {
    // only add the scripts if they aren't already on the page
    const elm = document.querySelector(`#${scriptId}`);
    if (elm) {
      return resolve();
    }

    const chromeUrl = chrome.runtime.getURL("");

    const diffInfo = document.createElement("script");
    diffInfo.setAttribute("type", "text/javascript");
    diffInfo.innerHTML = `
      window.diff = {
        url: "${chromeUrl.substring(0, chromeUrl.lastIndexOf("/"))}"
      }
    `;
    document.body.appendChild(diffInfo);

    // Add our page bridge
    const script = document.createElement("script");
    script.src = scriptName;
    script.onload = resolve;
    script.onerror = reject;
    script.id = scriptId;
    document.body.appendChild(script);
  });
};

const SCRIPT_HOST = process.env.SCRIPT_HOST;

export const runFrontend = () => {
  addScriptToPage(`${SCRIPT_HOST}/main.js`, "df-bridge");
};
