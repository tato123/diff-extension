export interface DomainResponse {
  domains: Array<string>;
}

const getDomains = async (uid: string): Promise<DomainResponse> => {
  const response = await fetch(
    `${process.env.API_SERVER}/user/${uid}/domains`,
    {
      method: 'get'
    }
  );

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
};

export default {
  getDomains
};
