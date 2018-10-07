import React from 'react';
import { Button, Form, HR, Anchor, Label } from '@diff/shared-components';
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
    localStorage['auth0-authorize'] = urlParams.get('state');

    this.webAuth.authorize({
      connection: 'google-oauth2',
      redirectUri: urlParams.get('return_to'),
      scope: 'openid profile offline_access',
      responseType: 'token id_token',
      state: urlParams.get('state'),
      nonce: urlParams.get('nonce'),
      audience: 'https://diff.auth0.com/api/v2/'
    });
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
