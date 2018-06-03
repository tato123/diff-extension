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
    script.onload = () => {
      resolve();
    };
    script.onerror = reject;
    script.id = scriptId;
    document.body.appendChild(script);
    document.body.insertAdjacentHTML("beforeend", `<df-app />`);
  });
};

/**
 * Configure our messaging
 */
window.addEventListener(
  "message",
  evt => {
    const data = evt.data;
    if (data.source && data.source === "@diff") {
      console.log(data);
    }
  },
  false
);

/**
 *
 */
const loadScripts = async () => {
  await addScriptToPage("frontend.js", "df-bridge-0123");
};

const getDomainsList = async () => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: "GET_DOMAIN_LIST", source: "diff" },
      response => {
        resolve(response);
      }
    );
  });
};

const getUserToken = async () => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: "GET_AUTH_TOKEN", source: "diff" },
      response => {
        resolve(response);
      }
    );
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
    // check if we are still authenticated
    const userToken = await getUserToken();

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
