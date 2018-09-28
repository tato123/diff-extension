import { sendMessageToFrontend } from './backgroundClient';

/**
 * Adds data that we want to associate with our
 * extension
 *
 */
const addEnvData = () => {
  const chromeUrl = chrome.runtime.getURL('');

  const diffInfo = document.createElement('script');
  diffInfo.setAttribute('type', 'text/javascript');
  diffInfo.innerHTML = `
    window.diff = {
      url: "${chromeUrl.substring(0, chromeUrl.lastIndexOf('/'))}"
    }
  `;
  document.body.appendChild(diffInfo);
};

/**
 * Adds our extension-frontend main script
 *
 *
 * @param {*} scriptName
 * @param {*} scriptId
 */
export const addScriptToPage = async (scriptName, scriptId) =>
  new Promise((resolve, reject) => {
    // only add the scripts if they aren't already on the page
    const elm = document.querySelector(`#${scriptId}`);
    if (elm) {
      return resolve();
    }

    // Add our page bridge
    const script = document.createElement('script');
    script.src = scriptName;
    script.onload = resolve;
    script.onerror = reject;
    script.id = scriptId;
    document.body.appendChild(script);
  });

export const runFrontend = async () => {
  /* eslint-disable prefer-destructuring */
  const SCRIPT_HOST = process.env.SCRIPT_HOST;
  addEnvData();
  return addScriptToPage(`${SCRIPT_HOST}/main.js`, 'df-bridge');
};
