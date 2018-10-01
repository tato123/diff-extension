import React from 'react';
import jwtDecode from 'jwt-decode';
import browser from '@diff/common/dist/browser';
import auth0 from 'auth0-js';

export default class Popup extends React.Component {
  state = {
    accessToken: null
  };

  async componentDidMount() {
    const {
      accessToken,
      idToken: token
    } = await browser.storage.html5.local.get(['accessToken', 'idToken']);
    if (token && this.isLoggedIn(token)) {
      this.getUserProfile(accessToken);
      this.setState({ accessToken });
      chrome.browserAction.setIcon({ path: '../images/icon_128.png' });
    } else {
      chrome.browserAction.setIcon({ path: '../images/inactive_icon_128.png' });
    }
  }

  getUserProfile = accessToken => {
    const webAuth = new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID
    });

    webAuth.client.userInfo(accessToken, (err, user) => {
      if (err) {
        console.error('Unable to get user profile', err);
        return;
      }
      console.log('user profile', user);
    });
  };

  renderLoggedIn = () => (
    <div>
      <h1>hey friend</h1>
    </div>
  );

  navigateTo = url =>
    browser.tabs.query({ active: true, currentWindow: true }).then(
      activeTab =>
        new Promise((resolve, reject) => {
          chrome.tabs.update(
            activeTab.id,
            { url },
            tab => (tab ? resolve(tab) : reject())
          );
        })
    );

  getState = () => `s-${Math.floor(Math.random() * 1000)}`;

  getNonce = () => `n-${Math.floor(Math.random() * 10000)}`;

  handleLogin = () => {
    const state = this.getState();
    const nonce = this.getNonce();

    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(activeTab =>
        browser.storage.local.set({
          loginReturnUrl: activeTab.url,
          state,
          nonce
        })
      )
      .then(() =>
        this.navigateTo(
          `http://localhost:8000/app/login?return_to=${encodeURIComponent(
            `chrome-extension://${browser.runtime.id}/html/login-return.html`
          )}&state=${state}&nonce=${nonce}`
        )
      );
  };

  logout = () => {
    // Remove the idToken from storage
    localStorage.clear();
    this.setState({ accessToken: null });
  };

  // The user is logged in if their token isn't expired
  isLoggedIn = token => jwtDecode(token).exp > Date.now() / 1000;

  renderNotLoggedIn = () => (
    <div>
      <label>Aww it looks like you're not logged in, lets fix that</label>
      <div>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    </div>
  );

  render() {
    const {
      state: { accessToken },
      renderLoggedIn,
      renderNotLoggedIn
    } = this;

    return (
      <div>
        {accessToken && renderLoggedIn()}
        {!accessToken && renderNotLoggedIn()}
      </div>
    );
  }
}
