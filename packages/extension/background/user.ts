import { getUserToken, TokenResponse } from "./storage";

interface DomainResponse {}

export const getUserDomains = async (): Promise<DomainResponse> => {
  const token: TokenResponse = await getUserToken();

  const response = await fetch(
    `${process.env.API_SERVER}/tokens/${token.token}/domains`,
    {
      method: "get"
    }
  );

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
};
