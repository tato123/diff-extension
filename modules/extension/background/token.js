const USER_TOKEN_KEY = "token";
export const getUserToken = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([USER_TOKEN_KEY], result => {
      resolve(Object.keys(result).length === 0 ? null : result);
    });
  });
};

export const storeUserToken = token => {
  const record = { [USER_TOKEN_KEY]: token };
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(record, () => {
      resolve();
    });
  });
};
