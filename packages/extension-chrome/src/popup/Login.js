import React from 'react';
import browser from '@diff/common/dist/browser';

import { Logo, Button, HR, Label } from '@diff/shared-components';
import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  flex: 1 auto;
  justify-content: space-between;

  img {
    height: 16px;
    width: auto;
    align-self: center;
  }
`;

export default class Login extends React.Component {
  navigateTo = url =>
    browser.tabs.query({ active: true, currentWindow: true }).then(
      activeTab =>
        new Promise((resolve, reject) => {
          chrome.tabs.update(
            activeTab.id,
            { url },
            tab => (tab ? resolve(tab) : reject())
          );
        })
    );

  getState = () => `s-${Math.floor(Math.random() * 1000)}`;

  getNonce = () => `n-${Math.floor(Math.random() * 10000)}`;

  handleLogin = () => {
    const state = this.getState();
    const nonce = this.getNonce();

    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(activeTab =>
        browser.storage.local.set({
          loginReturnUrl: activeTab.url,
          state,
          nonce
        })
      )
      .then(() =>
        this.navigateTo(
          `${process.env.WEB_HOME}/app/login?return_to=${encodeURIComponent(
            `chrome-extension://${browser.runtime.id}/html/login-return.html`
          )}&state=${state}&nonce=${nonce}`
        )
      );
  };

  render() {
    return (
      <div>
        <Menu>
          <Logo />
          <Button primary onClick={this.handleLogin}>
            Login
          </Button>
        </Menu>
        <HR />
        <Label>You are not currently logged in</Label>
      </div>
    );
  }
}
