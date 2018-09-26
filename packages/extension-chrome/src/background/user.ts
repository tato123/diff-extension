import { getUserToken, TokenResponse } from './storage';
import { getDomains } from '@diff/common';

export const getUserDomains = async (): Promise<any> => {
  const token: TokenResponse = await getUserToken();
  return getDomains(token.token);
};
