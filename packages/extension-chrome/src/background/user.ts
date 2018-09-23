import { getUserToken, TokenResponse } from "./storage";
import { getDomains, DomainResponse } from "@diff/common";

export const getUserDomains = async (): Promise<DomainResponse> => {
  const token: TokenResponse = await getUserToken();
  return getDomains(token.token);
};
