/**
 *
 * @param {string} username - username credential
 * @param {string} password - password credential
 * @param {string} refreshToken - refreshToken credential
 * @returns {Promise}
 */
const authenticate = async (username, password, refreshToken) => {
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

const signup = async (email, password) => {
  /*eslint disable */
  debugger;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  };

  const response = await fetch(`${process.env.API_SERVER}/signup`, {
    ...options,
    method: "POST"
  });

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
};

export default {
  authenticate,
  signup
};
