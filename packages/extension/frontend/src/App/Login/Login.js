import React from "react";
import PropTypes from "prop-types";
import { Transition } from "react-spring";

import Modal from "./components/Modal";
import { StyleBoundary } from "@diff/shared-components";
import CredentialsForm from "./components/CredentialForm";
import SignupForm from "./components/SignupForm";

/**
 * Login widget handles our authentication lifecycle, both
 * checking whether a user is currently logged in and as a result
 * allowing us to login or create a new account if they are not
 *
 * @returns {React.Component}
 */
export default class Login extends React.Component {
  static propTypes = {
    /**
     * Action handler for logging in, should
     * return a promise
     */
    login: PropTypes.func.isRequired,
    /**
     * Getter to fetch our cache token
     */
    getCacheToken: PropTypes.func.isRequired
  };

  state = {
    requiresLogin: false,
    signup: false
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
    return this.props.login({ username, password });
  };

  onShowSignup = () => {
    this.setState({ signup: true });
  };

  onSignup = evt => {
    console.log(evt);
  };

  renderSignup = styles => (
    <SignupForm
      onSubmit={this.onSignup}
      onCancel={() => this.setState({ signup: false })}
      style={styles}
    />
  );

  renderCredentials = styles => (
    <CredentialsForm
      style={styles}
      onSubmit={this.onLoginRequest}
      onSignup={this.onShowSignup}
    />
  );

  render() {
    const {
      state: { requiresLogin, signup }
    } = this;

    if (requiresLogin) {
      return (
        <Modal>
          <StyleBoundary>
            <Modal.Content
              id="login-modal"
              style={{
                position: "relative",
                overflow: "hidden",
                width: "500px",
                height: "375px"
              }}
            >
              <Transition
                from={{ opacity: 0 }}
                enter={{ opacity: 1, left: 20 }}
                leave={{ opacity: 0, left: -700 }}
              >
                {signup ? this.renderSignup : this.renderCredentials}
              </Transition>
            </Modal.Content>
          </StyleBoundary>
        </Modal>
      );
    }
    return null;
  }
}
