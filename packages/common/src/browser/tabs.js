const query = async options =>
  new Promise((resolve, reject) => {
    chrome.tabs.query(
      options,
      tabs => (tabs.length > 0 ? resolve(tabs[0]) : reject())
    );
  });

export default {
  query
};
