import React from 'react';
import PropTypes from 'prop-types';

const EXTENSION_ID = process.env.EXTENSION_ID;

export default class ExtensionListener extends React.Component {
  static propTypes = {
    shouldPoll: PropTypes.bool,
    pollTime: PropTypes.number,
    extensionId: PropTypes.string,

    onInstalled: PropTypes.func,
    onMessage: PropTypes.func,
    render: PropTypes.func.isRequired,
    refreshToken: PropTypes.string
  };

  static defaultProps = {
    shouldPoll: true,
    pollTime: 1000,
    extensionId: EXTENSION_ID,

    onInstalled: () => {},
    onMessage: () => {}
  };

  state = {
    intervalId: null
  };

  componentDidMount() {
    if (typeof window !== `undefined`) {
      window.addEventListener('message', this.onMessage);
    }

    this.invokeCheck();
    this.timerId = setInterval(() => {
      this.invokeCheck();
    }, 250);
  }

  callChrome = action => {
    const {
      props: { extensionId }
    } = this;
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(extensionId, action, response => {
        if (response) {
          return resolve(response);
        }
        reject();
      });
    });
  };

  invokeCheck = () => {
    const {
      props: { onInstalled, refreshToken }
    } = this;

    const validateInstalled = {
      type: 'VERIFY_INSTALLED'
    };

    const storeUid = {
      type: 'STORE_TOKEN',
      payload: {
        refreshToken
      }
    };

    // normally we let the browser handle injection of content
    // script via manifest, in this case we don't want to wait for a
    // refresh
    const forceInject = {
      type: 'FORCE_INJECT'
    };

    this.callChrome(validateInstalled)
      .then(() => refreshToken && this.callChrome(storeUid))
      .then(() => this.callChrome(forceInject))
      .then(() => {
        onInstalled();
        clearInterval(this.timerId);
      })
      .catch(() => {});
  };

  componentWillUnmount() {
    clearInterval(this.timerId);
    if (typeof window !== `undefined`) {
      window.removeEventListener('message', this.onMessage);
    }
  }

  onMessage = evt => {
    if (evt.data && evt.data.source === '@diff/contentScript') {
      const message = evt.data;
      this.props.onMessage(message);
    }
  };

  render() {
    const {
      props: { render }
    } = this;

    return <React.Fragment>{render()}</React.Fragment>;
  }
}
