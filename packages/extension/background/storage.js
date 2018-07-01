export const USER_TOKEN_KEY = "token";
export const getUserToken = () => get(USER_TOKEN_KEY);
export const storeUserToken = token => set(USER_TOKEN_KEY, token);

export const get = key => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], result => {
      resolve(Object.keys(result).length === 0 ? null : result);
    });
  });
};

export const set = (key, value) => {
  const record = { [key]: value };
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(record, () => {
      resolve();
    });
  });
};
