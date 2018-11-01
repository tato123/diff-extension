import jwtDecode from 'jwt-decode';
import storage from './storage';

const checkSession = async () => {
  const { id_token, access_token } = await storage.html5.local.get([
    'id_token',
    'access_token'
  ]);

  if (!id_token || !access_token) {
    throw new Error('No token set');
  }

  const valid = jwtDecode(id_token).exp > Date.now() / 1000;
  return valid
    ? { id_token, access_token }
    : { id_token: null, access_token: null };
};

/**
 * Attempts to get a user if one is present in the cookies,
 * otherwise this will just fail out with an erorr
 */
const getUser = async () => {
  const response = await fetch(`${process.env.API_SERVER}/auth/profile`, {
    credentials: 'include',
    mode: 'cors'
  });

  if (!response.ok) {
    throw new Error('No logged in user');
  }

  return response.json();
};

const logoutUser = async () => {
  const response = await fetch(`${process.env.API_SERVER}/auth/logout`, {
    credentials: 'include',
    mode: 'cors'
  });

  if (!response.ok) {
    throw new Error('Unable to logout user');
  }

  return response.text();
};

const getFirebaseToken = async () => {
  const response = await fetch(`${process.env.API_SERVER}/auth/firebase`, {
    credentials: 'include',
    mode: 'cors'
  });

  if (!response.ok) {
    throw new Error('No logged in user');
  }

  return response.json();
};

const authorize = async (webAuthInstance, state, nonce, redirectUri) => {
  // set browser auth0 authorize from our custom stsate,
  // not sure that this is even needed
  await storage.html5.local.set({ 'auth0-authorize': state });

  // authorize with auth0
  webAuthInstance.authorize({
    connection: 'google-oauth2',
    redirectUri,
    scope: 'openid profile email offline_access',
    responseType: 'code',
    state,
    nonce,
    audience: 'https://api.getdiff.app/v1'
  });

  return Promise.resolve();
};

const renewSession = async () => {
  const { refresh_token: refreshToken } = await storage.html5.local.get([
    'refresh_token'
  ]);

  return fetch(
    `${process.env.API_SERVER}/auth/renew?refreshToken=${refreshToken}`
  );
};

export default {
  renewSession,
  logoutUser,
  authorize,
  checkSession,
  getUser,
  getFirebaseToken
};
