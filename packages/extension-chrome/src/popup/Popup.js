import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

export default class Popup extends React.Component {
  static propTypes = {
    authDomain: PropTypes.string,
    clientId: PropTypes.string,
    api: PropTypes.object
  };

  static defaultProps = {
    authDomain: '',
    clientId: '',
    api: null
  };

  state = {
    authResult: null
  };

  componentDidMount() {
    const authResult = JSON.parse(localStorage.authResult || '{}');
    const token = authResult.id_token;
    if (token && this.isLoggedIn(token)) {
      this.getUserProfile(authResult);
      // exchange for a firebase token
      this.exchangeForToken(token);
      this.setState({ authResult });
    }
  }

  getUserProfile = token => {
    fetch(`https://diff.auth0.com/userinfo`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`
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

  logout = () => {
    // Remove the idToken from storage
    localStorage.clear();
    this.setState({ authResult: null });
  };

  // The user is logged in if their token isn't expired
  isLoggedIn = token => jwtDecode(token).exp > Date.now() / 1000;

  exchangeForToken = token => {
    fetch(`${process.env.API_SERVER}/auth/firebase`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(response.statusText);
      })
      .then(({ firebaseToken }) =>
        this.props.api.auth.tokenLogin(firebaseToken)
      )
      .then(response => {
        console.log('firebase response', response);
      })
      .catch(error => {
        console.error(error.message);
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
