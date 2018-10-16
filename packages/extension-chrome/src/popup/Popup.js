import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
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
  static propTypes = {
    authProvider: PropTypes.object.isRequired
  };

  state = {
    accessToken: null
  };

  async componentDidMount() {
    const {
      props: { authProvider }
    } = this;

    try {
      const {
        access_token: accessToken
      } = await authProvider.checkAndRenewSession();
      this.setState({ accessToken });
    } catch (error) {
      console.error('No Session available');
    }
  }

  logout = () => {
    const {
      props: { authProvider }
    } = this;

    authProvider.logout();

    // Remove the idToken from storage
    localStorage.clear();
    this.setState({ accessToken: null });
    chrome.browserAction.setIcon({ path: '../images/inactive_icon_128.png' });
  };

  // The user is logged in if their token isn't expired
  isLoggedIn = token => jwtDecode(token).exp > Date.now() / 1000;

  render() {
    const {
      props: { authProvider },
      state: { accessToken },
      logout
    } = this;

    return (
      <StyleBoundary>
        <Container>
          {accessToken && (
            <User
              accessToken={accessToken}
              onLogout={logout}
              authProvider={authProvider}
            />
          )}
          {!accessToken && <Login />}
        </Container>
      </StyleBoundary>
    );
  }
}
