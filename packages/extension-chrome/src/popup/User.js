import React from 'react';
import PropTypes from 'prop-types';
import { Image, Logo, Button, HR, Label } from '@diff/shared-components';
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
const Avatar = styled(Image)`
  width: 32px;
  height: 32px;
`;

export default class User extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
    webAuth: PropTypes.object.isRequired
  };

  state = {
    user: null
  };

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = () => {
    const {
      props: { accessToken, webAuth }
    } = this;

    webAuth.client.userInfo(accessToken, (err, user) => {
      if (err) {
        console.error('Unable to get user profile', err);
        return;
      }
      this.setState({ user });
    });
  };

  render() {
    const {
      state: { user },
      props: { onLogout }
    } = this;

    return (
      <div>
        <Menu>
          <Logo />
          <Button primary onClick={onLogout}>
            Logout
          </Button>
        </Menu>
        <HR />
        {user && (
          <div>
            <Label>{user.name}</Label>
            <Avatar avatar src={user.picture} alt="user image" />
          </div>
        )}
      </div>
    );
  }
}
