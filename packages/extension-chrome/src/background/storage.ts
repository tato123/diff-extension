import _ from 'lodash-es';
import { browser } from '@diff/common';

export const USER_TOKEN_KEY = 'firebaseToken';

export interface TokenResponse {
  token: {
    token: string;
  };
}

export const getUserToken = (): Promise<TokenResponse> => {
  const { firebaseToken } = browser.storage.local.get(['firebaseToken']);
  return Promise.resolve(firebaseToken);
};

export const addSitePreference = async (value: string) => {
  const { sites } = await browser.storage.local.get(['sites']);
  if (_.isNil(sites)) {
    return browser.storage.local.set({ sites: [value] });
  }

  return browser.Storage.local.set({ sites: _.union(sites, [value]) });
};

export const getSitePreference = async (): Promise<Array<string>> => {
  const { sites } = await browser.storage.local.get(['sites']);
  return sites;
};
