import React from 'react';
import jwtDecode from 'jwt-decode';
import { StyleBoundary } from '@diff/shared-components';

import styled from 'styled-components';
import { checkAndRenewSession, authProvider } from '../authentication';
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
    this.webAuth = authProvider();

    try {
      const { access_token: accessToken } = await checkAndRenewSession();
      this.setState({ accessToken });
    } catch (error) {
      console.error('No Session available');
    }
  }

  logout = () => {
    this.webAuth.logout({});
    // Remove the idToken from storage
    localStorage.clear();
    this.setState({ accessToken: null });
    chrome.browserAction.setIcon({ path: '../images/inactive_icon_128.png' });
  };

  // The user is logged in if their token isn't expired
  isLoggedIn = token => jwtDecode(token).exp > Date.now() / 1000;

  render() {
    const {
      state: { accessToken },
      webAuth
    } = this;

    return (
      <StyleBoundary>
        <Container>
          {accessToken && (
            <User
              accessToken={accessToken}
              onLogout={this.logout}
              webAuth={webAuth}
            />
          )}
          {!accessToken && <Login />}
        </Container>
      </StyleBoundary>
    );
  }
}
