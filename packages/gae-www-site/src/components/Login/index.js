import React from 'react';
import { Button, Form, HR, Anchor, Label } from '@diff/shared-components';
import browser from '@diff/common/dist/browser';
import auth0 from 'auth0-js';

export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.webAuth = new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID
    });
  }

  onLoginWithGoogle = () => {
    const urlParams = new URLSearchParams(window.location.search);

    const state = urlParams.get('state');
    const nonce = urlParams.get('nonce');
    const redirectUri = urlParams.get('return_to');

    // will redirect page if necessary
    browser.auth.authorize(this.webAuth, state, nonce, redirectUri);
  };

  onLoginWithMagicLink = evt => {
    evt.preventDefault();
    console.log('magic link it up', evt.target.email.value);
    return false;
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Button onClick={this.onLoginWithGoogle} primary>
            Signin with Google
          </Button>
        </div>
        <div>
          <form onSubmit={this.onLoginWithMagicLink}>
            <Form.Input
              label="Email"
              name="email"
              type="email"
              placeholder="email@domain.com"
            />
            <Button type="submit" primary>
              Send magic link
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
