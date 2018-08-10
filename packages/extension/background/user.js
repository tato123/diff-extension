import firebase from "firebase";
import jwtDecode from "jwt-decode";

const authenticate = async refreshToken => {
  const options = {
    body: `refresh_token=${refreshToken}&grant_type=refresh_token`
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

export const login = async refreshToken => {
  try {
    const token = await authenticate(refreshToken);
    await firebase.auth().signInWithCustomToken(token.access_token);
    const jwt = jwtDecode(token.access_token);

    return {
      firestore: firebase.firestore(),
      token: jwt
    };
  } catch (err) {
    console.error(err);
  }
};
