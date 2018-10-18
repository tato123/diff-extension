import React from 'react';
import { Button, Form, HR, Anchor, Label } from '@diff/shared-components';
import browser from '@diff/common/dist/browser';
import auth0 from 'auth0-js';

export default class Login extends React.PureComponent {
  webAuth = new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    scope: 'openid profile email offline_access'
  });

  onLoginWithGoogle = async () => {
    const urlParams = new URLSearchParams(window.location.search);

    const state = urlParams.get('state');
    const nonce = urlParams.get('nonce');
    const redirectUri = urlParams.get('return_to');

    // set browser auth0 authorize from our custom stsate,
    // not sure that this is even needed
    await browser.storage.html5.local.set({ 'auth0-authorize': state });

    // authorize with auth0
    this.webAuth.authorize({
      connection: 'google-oauth2',
      redirectUri,
      scope: 'openid profile email offline_access',
      responseType: 'code',
      state,
      nonce,
      audience: 'https://api.getdiff.app/v1'
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
