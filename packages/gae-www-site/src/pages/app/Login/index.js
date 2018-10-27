import React from 'react';
import { Button, Form, Header, HR } from '@diff/shared-components';
import browser from '@diff/common/dist/browser';
import auth0 from 'auth0-js';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { google } from 'react-icons-kit/icomoon/google';
import { Redirect } from '@reach/router';
import { user as userContext } from '../../../utils/auth';

const Container = styled.div`
  color: #231c47;
  .content {
    border-radius: 8px;

    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-top: 32px;
  }

  .left {
    background-color: #231c48;
    height: inherit;
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 300;
    padding: 64px 32px;
  }

  .right {
    background-color: #fff;
    padding: 64px 48px;
  }

  label,
  span {
    color: #231c47 !important;
  }

  a {
    color: #5ccada;
    text-decoration: underline;
  }

  .leftIcon {
    position: absolute;
    left: 16px;
  }
  input[type='email'] {
    padding: 16px !important;
    border-radius: 4px;
  }
`;

const RoundButton = styled(Button)`
  border-radius: 25px;
  width: 100%;

  font-weight: 500 !important;
  font-size: 1.2rem;
  padding: 8px !important;
  height: 100%;
`;

const GoogleButton = styled(RoundButton)`
  margin-top: 16px;
  background-color: #4949b3 !important;
`;

const DarkHR = styled(HR)`
  background: #dbdbdb;
  opacity: 1;
  box-shadow: none;
`;

const Footer = styled.div`
  color: #231c47;
  text-align: center;
  margin-top: 16px;
`;

export default class Login extends React.Component {
  state = {
    user: null
  };

  async componentDidMount() {
    // try to get the user, if so skip this

    userContext
      .hasUser()
      .then(user => {
        userContext.setUser(user);
        this.setState({ user });
      })
      .catch(error => {
        console.warn(error.message);
      });

    const urlParams = new URLSearchParams(window.location.search);

    const origin = urlParams.get('origin') || `${process.env.WEB_HOME}/app`;
    this.redirectUri = `${
      process.env.API_SERVER
    }/auth/codegrant?origin=${origin}`;

    this.webAuth = new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      scope: 'openid profile email offline_access',
      responseType: 'code',
      redirectUri: this.redirectUri
    });
  }

  onLoginWithGoogle = async () => {
    // set browser auth0 authorize from our custom stsate,
    // not sure that this is even needed
    await browser.storage.html5.local.set({ 'auth0-authorize': this.state });

    // authorize with auth0
    this.webAuth.authorize({
      connection: 'google-oauth2',
      scope: 'openid profile email offline_access',
      state: this.state,
      nonce: this.nonce,
      redirectUri: this.redirectUri,
      audience: 'https://api.getdiff.app/v1'
    });
  };

  onLoginWithMagicLink = evt => {
    evt.preventDefault();

    this.webAuth.passwordlessStart(
      {
        connection: 'email',
        send: 'link',
        email: evt.target.email.value,
        redirectUri: this.redirectUri
      },
      (err, res) => {
        if (err) {
          console.error('an error occured', err);
          return;
        }

        console.log(res);
        // handle errors or continue
      }
    );

    return false;
  };

  render() {
    const {
      state: { user }
    } = this;
    if (user) {
      return <Redirect to="/app/account" />;
    }

    console.log('web home is', process.env.WEB_HOME);
    return (
      <Container className="container">
        <div className="row content">
          <div className="col-4 left">
            <p>
              Manage feedback, requirements, and change for designers and
              developers
              {' '}
            </p>
          </div>
          <div className="col right">
            <div>
              <Header as="h1">Create a Diff account....</Header>
              <div>with Google</div>

              <GoogleButton onClick={this.onLoginWithGoogle} primary>
                <Icon icon={google} className="leftIcon" />
                Signin with Google
              </GoogleButton>
            </div>
            <div style={{ margin: '32px 0px' }}>
              <DarkHR />
            </div>
            <div>
              <form onSubmit={this.onLoginWithMagicLink}>
                <Form.Input
                  label="with email"
                  name="email"
                  type="email"
                  placeholder="email@domain.com"
                />
                <RoundButton type="submit" primary>
                  Create Account
                </RoundButton>
              </form>
              <Footer>
                Already have an account? 
                {' '}
                <a href="#">Log in</a>
              </Footer>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
