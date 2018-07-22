export const authenticate = async (username, password, refreshToken) => {
  const options = refreshToken
    ? {
        body: `refresh_token=${refreshToken}&grant_type=refresh_token`
      }
    : {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
      };

  const response = await fetch(`${process.env.API_SERVER}/authenticate`, {
    ...options,
    method: "POST"
  });

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
};
