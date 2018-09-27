import React from 'react';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import Auth0Chrome from 'auth0-chrome';

export default class Popup extends React.Component {
  static propTypes = {
    authDomain: PropTypes.string,
    clientId: PropTypes.string
  };

  static defaultProps = {
    authDomain: '',
    clientId: ''
  };

  state = {
    authResult: null
  };

  componentDidMount() {
    const authResult = JSON.parse(localStorage.authResult || '{}');
    const token = authResult.id_token;
    if (token && this.isLoggedIn(token)) {
      this.setState({ authResult });
    }
  }

  isLoggedIn(token) {
    // The user is logged in if their token isn't expired
    return jwt_decode(token).exp > Date.now() / 1000;
  }

  logout() {
    // Remove the idToken from storage
    localStorage.clear();
    this.setState({ authResult: null });
  }

  getUserProfile = () => {
    const {
      props: { authDomain },
      state: { authResult }
    } = this;

    fetch(`https://${authDomain}/userinfo`, {
      headers: {
        Authorization: `Bearer ${authResult.access_token}`
      }
    })
      .then(resp => resp.json())
      .then(profile => {
        console.log('got profile', profile);
      })
      .catch(this.logout);
  };

  renderLoggedIn = () => (
    <div>
      <h1>hey friend</h1>
    </div>
  );

  handleLogin = () => {
    chrome.runtime.sendMessage({
      type: 'authenticate'
    });
  };

  renderNotLoggedIn = () => (
    <div>
      <label>Aww it looks like you're not logged in, lets fix that</label>
      <div>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    </div>
  );

  render() {
    const {
      state: { authResult },
      renderLoggedIn,
      renderNotLoggedIn
    } = this;

    return (
      <div>
        {authResult && renderLoggedIn()}
        {!authResult && renderNotLoggedIn()}
      </div>
    );
  }
}
