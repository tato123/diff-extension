import React from 'react';
import browser from '@diff/common/dist/browser';

import { Logo, Space } from '@diff/shared-components';
import Menu from './Menu';
import Row from './Row';

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
      .then(() => {
        this.navigateTo(
          `${process.env.WEB_HOME}/app/login?origin=${encodeURIComponent(
            `chrome-extension://${browser.runtime.id}/html/login-return.html`
          )}`
        );
        window.close();
      });
  };

  render() {
    return (
      <div>
        <Menu onClick={this.handleLogin} actionText="Login / Signup" />
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
          <Space top={2} bottom={2}>
            <Logo style={{ opacity: 0.2 }} />
          </Space>
        </Row>
      </div>
    );
  }
}
