import React from 'react';
import browser from '@diff/common/dist/browser';

const isBrowser = typeof window !== `undefined`;

export const user = {
  user: null,
  isLoggedIn() {
    return this.user != null;
  },
  logout() {
    this.user = null;
  },
  setUser(val) {
    this.user = val;
  },
  async hasUser() {
    return browser.auth.getUser();
  }
};

const UserContext = React.createContext(user);

export default UserContext;
