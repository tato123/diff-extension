import React from 'react';
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
    user: null
  };

  componentDidMount() {
    // attempt to get our user, if no user
    // object then we probably encountered a no login
    // state
    browser.auth.getUser().then(user => {
      this.setState({
        user
      });
    });
  }

  logout = async () => {
    await browser.auth.logoutUser();
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
