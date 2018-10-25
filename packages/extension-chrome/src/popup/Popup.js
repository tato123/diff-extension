import React from 'react';
import browser from '@diff/common/dist/browser';
import PropTypes from 'prop-types';
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
    user: null
  };

  async componentDidMount() {
    const user = await browser.auth.getUser();
    this.setState({
      user
    });
  }

  logout = () => {
    // const {
    //   props: { authProvider }
    // } = this;
    // authProvider.logout();
    // // Remove the idToken from storage
    // localStorage.clear();
    // this.setState({ accessToken: null });
    // chrome.browserAction.setIcon({ path: '../images/inactive_icon_128.png' });
  };

  render() {
    const {
      state: { user },
      logout
    } = this;

    return (
      <StyleBoundary>
        <Container>
          {user && <User user={user} onLogout={logout} />}
          {!user && <Login />}
        </Container>
      </StyleBoundary>
    );
  }
}
