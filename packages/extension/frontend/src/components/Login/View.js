import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "components/Form";
import { Redirect } from "react-router";
import Widget from "components/Widget";

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
    isFetchingRefreshToken: false
  };

  componentDidMount() {
    this.fetchTokenAndLogin();
  }

  fetchTokenAndLogin = () => {
    this.setState({ isFetchingRefreshToken: true });
    // check to see if we have a token
    this.props
      .getCacheToken()
      .then(refreshToken => this.props.login({ refreshToken }))
      .finally(() => this.setState({ isFetchingRefreshToken: false }));
  };

  onLoginRequest = evt => {
    evt.preventDefault();
    const username = evt.target.user.value;
    const password = evt.target.password.value;
    this.props.login({ username, password });
    return false;
  };

  render() {
    const {
      state: { isFetchingRefreshToken },
      props: { accessToken }
    } = this;

    // step 1 check the token
    if (isFetchingRefreshToken) {
      return null;
    }

    if (accessToken) {
      return <Redirect to="/" />;
    }

    return (
      <Modal>
        <Widget>
          <Modal.Content id="login-modal">
            <div>
              <h1>Login</h1>
              <form onSubmit={this.onLoginRequest} autoComplete="off">
                <Form.Row>
                  <Form.Label>Username</Form.Label>
                  <Form.Input name="user" type="text" />
                </Form.Row>
                <Form.Row>
                  <Form.Label>Password</Form.Label>
                  <Form.Input name="password" type="password" />
                </Form.Row>
                <Form.Row spacing="lg">
                  <Form.Button type="submit">Submit</Form.Button>
                </Form.Row>
              </form>
            </div>
          </Modal.Content>
        </Widget>
      </Modal>
    );
  }
}
