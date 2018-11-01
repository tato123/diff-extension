import React from 'react';
import browser from '@diff/common/dist/browser';
import { StyleBoundary, Space } from '@diff/shared-components';

import styled from 'styled-components';
import Login from './Login';
import User from './User';
import Row from './Row';
import Anchor from './Anchor';

const Container = styled.div`
  width: 300px;
  min-height: 200px;
  max-height: 400px;
  overflow: hidden;
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
    try {
      await browser.auth.logoutUser();
      this.setState({ user: null });
    } catch (error) {
      console.error(error.message);
    }
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
          <Row style={{ textAlign: 'center' }}>
            <Space style={{ marginBottom: '-6px' }}>
              <small>Version 0.0.28</small>
            </Space>
            <Anchor href="/help">Give us Feedback</Anchor>
          </Row>
        </Container>
      </StyleBoundary>
    );
  }
}
