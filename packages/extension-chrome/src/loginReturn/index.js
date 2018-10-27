import browser from '@diff/common/dist/browser';

async function getActiveTab(options) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(options, activeTabs => {
      if (activeTabs.length > 0) {
        return resolve(activeTabs);
      }
      return reject(activeTabs);
    });
  });
}

async function routeError(error = 'unknown error') {
  console.error(error);
  const activeTabs = await getActiveTab({
    active: true,
    currentWindow: true
  });

  chrome.tabs.update(activeTabs[0].id, {
    url: `${process.env.WEB_HOME}/support`
  });
}

(async function redirect() {
  try {
    const { loginReturnUrl } = await browser.storage.local.get([
      'loginReturnUrl'
    ]);

    const activeTabs = await getActiveTab({
      active: true,
      currentWindow: true
    });

    chrome.tabs.update(activeTabs[0].id, {
      url: loginReturnUrl || `${process.env.WEB_HOME}/support`
    });
  } catch (error) {
    routeError(error);
  }
})();
