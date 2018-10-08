import React from 'react';
import jwtDecode from 'jwt-decode';
import browser from '@diff/common/dist/browser';
import { StyleBoundary } from '@diff/shared-components';

import styled from 'styled-components';
import Login from './Login';
import User from './User';

const Container = styled.div`
  width: 200px;
  max-height: 400px;
  overflow: auto;
`;

export default class Popup extends React.Component {
  state = {
    accessToken: null
  };

  async componentDidMount() {
    const {
      access_token: accessToken,
      id_token: token
    } = await browser.storage.html5.local.get(['access_token', 'id_token']);
    if (token && this.isLoggedIn(token)) {
      this.setState({ accessToken });
      chrome.browserAction.setIcon({ path: '../images/icon_128.png' });
    } else {
      chrome.browserAction.setIcon({ path: '../images/inactive_icon_128.png' });
    }
  }

  logout = () => {
    // Remove the idToken from storage
    localStorage.clear();
    this.setState({ accessToken: null });
    chrome.browserAction.setIcon({ path: '../images/inactive_icon_128.png' });
  };

  // The user is logged in if their token isn't expired
  isLoggedIn = token => jwtDecode(token).exp > Date.now() / 1000;

  render() {
    const {
      state: { accessToken }
    } = this;

    return (
      <StyleBoundary>
        <Container>
          {accessToken && (
            <User accessToken={accessToken} onLogout={this.logout} />
          )}
          {!accessToken && <Login />}
        </Container>
      </StyleBoundary>
    );
  }
}
