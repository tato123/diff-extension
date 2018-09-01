export const USER_TOKEN_KEY = "token";

export interface TokenResponse {
  token: {
    token: string;
  };
}

export const getUserToken = (): Promise<TokenResponse> => get(USER_TOKEN_KEY);

export const storeUserToken = (token: string): Promise<void> =>
  set(USER_TOKEN_KEY, token);

export const get = (
  key: string,
  defaultValue?: any | undefined
): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], result => {
      resolve(Object.keys(result).length === 0 ? defaultValue || null : result);
    });
  });
};

export const set = (key: string, value: any): Promise<void> => {
  const record = { [key]: value };
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(record, () => {
      resolve();
    });
  });
};

export const addSitePreference = async (value: string) => {
  const key = "USER_CLICKED_PREFERENCE";
  const sites: any = await get(key, []);
  const innerArray = Array.isArray(sites) ? sites : sites[key];

  if (value) {
    innerArray.push(value);
    await set(key, _.uniq(innerArray));
  }

  return innerArray;
};

export const getSitePreference = async (): Promise<Array<string>> => {
  const key = "USER_CLICKED_PREFERENCE";
  const sites: any = await get(key, []);
  const innerArray = Array.isArray(sites) ? sites : sites[key];

  return innerArray;
};
