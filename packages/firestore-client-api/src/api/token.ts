export interface DomainResponse {
  domains: Array<string>;
}

export const getDomains = async (token: any): Promise<DomainResponse> => {
  const response = await fetch(
    `${process.env.API_SERVER}/tokens/${token}/domains`,
    {
      method: "get"
    }
  );

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
};
