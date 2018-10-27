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

export default class User extends React.PureComponent {
  static propTypes = {
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  render() {
    const {
      props: { onLogout, user }
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
