import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { StyleBoundary, Form, Button, Header } from "@diff/shared-components";

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

Modal.Content = styled.div`
  background-color: #191b3b;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 500px;
  color: #fff;
  border-radius: 8px;
`;

export default class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    getCacheToken: PropTypes.func.isRequired,
    refreshToken: PropTypes.string,
    accessToken: PropTypes.string
  };

  state = {
    requiresLogin: false
  };

  async componentDidMount() {
    try {
      const refreshToken = await this.props.getCacheToken();
      if (refreshToken) {
        await this.props.login({ refreshToken });
      } else {
        this.setState({ requiresLogin: true });
      }
    } catch (err) {
      this.setState({ requiresLogin: true });
    }
  }

  onLoginRequest = evt => {
    evt.preventDefault();
    const username = evt.target.user.value;
    const password = evt.target.password.value;
    this.props.login({ username, password });
    return false;
  };

  loginScreen = () => (
    <Modal>
      <StyleBoundary>
        <Modal.Content id="login-modal">
          <div>
            <Header as="h4">Login</Header>
            <Form onSubmit={this.onLoginRequest} autoComplete="off">
              <Form.Input
                label="Username"
                name="user"
                type="text"
                placeholder="email@domain.com"
              />
              <Form.Input
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
              />
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </Modal.Content>
      </StyleBoundary>
    </Modal>
  );

  render() {
    if (this.state.requiresLogin) {
      return this.loginScreen();
    }
    return null;
  }
}
