import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import browser from '@diff/common/dist/browser';
import auth0 from 'auth0-js';

export default class Popup extends React.Component {
  static propTypes = {
    authDomain: PropTypes.string,
    clientId: PropTypes.string,
    api: PropTypes.object
  };

  static defaultProps = {
    authDomain: '',
    clientId: '',
    api: null
  };

  state = {
    authResult: null
  };

  async componentDidMount() {
    const { accessToken, idToken: token } = await browser.storage.local.get([
      'accessToken',
      'idToken'
    ]);
    if (token && this.isLoggedIn(token)) {
      this.getUserProfile(accessToken);
      // exchange for a firebase token
      this.exchangeForToken(token);
      this.setState({ token, accessToken });
    }
  }

  get chromeExtensionId() {
    return chrome.runtime.id;
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

  activeTab = () =>
    new Promise((resolve, reject) => {
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        tabs => (tabs.length > 0 ? resolve(tabs[0]) : reject())
      );
    });

  navigateTo = url =>
    this.activeTab().then(
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

    this.activeTab()
      .then(activeTab =>
        chrome.storage.local.set(
          {
            loginReturnUrl: activeTab.url,
            state,
            nonce
          },
          Promise.resolve
        )
      )
      .then(() =>
        this.navigateTo(
          `http://localhost:8000/app/login?return_to=${encodeURIComponent(
            `chrome-extension://${
              this.chromeExtensionId
            }/html/login-return.html`
          )}&state=${state}&nonce=${nonce}`
        )
      );
  };

  logout = () => {
    // Remove the idToken from storage
    localStorage.clear();
    this.setState({ authResult: null });
  };

  // The user is logged in if their token isn't expired
  isLoggedIn = token => jwtDecode(token).exp > Date.now() / 1000;

  exchangeForToken = token => {
    fetch(`${process.env.API_SERVER}/auth/firebase`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(response.statusText);
      })
      .then(({ firebaseToken }) =>
        this.props.api.auth.tokenLogin(firebaseToken)
      )
      .then(response => {
        console.log('firebase response', response);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

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
