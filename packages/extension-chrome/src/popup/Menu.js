import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button } from '@diff/shared-components';
import styled from 'styled-components';
import RoundButton from './RoundButton';

const Avatar = styled(Image)`
  width: 32px;
  height: 32px;
`;

const Row = styled.div`
  border-bottom: var(--df-border);

  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  alignself: flex-start;
  > div:first-child {
    color: var(--df-text-color);
    font-size: 14px;
    font-weight: bold;
  }

  > div:last-child {
    color: var(--df-text-color);
    font-size: 12px;
    opacity: 0.89;
  }
`;

const FlatButton = styled(Button.Flat)`
  color: var(--color-purple);
  padding: 0 !important;
  font-size: 14px;

  &:focus,
  &:active,
  &:hover {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
  }
`;

const Menu = ({ user, onClick, actionText }) => (
  <Row style={{ justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {user && (
        <React.Fragment>
          <div style={{ marginRight: '16px', display: 'flex' }}>
            <Avatar avatar src={user.picture} alt="user image" />
          </div>
          <UserInfo style={{}}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </UserInfo>
        </React.Fragment>
      )}
    </div>
    <FlatButton primary type="button" onClick={onClick}>
      {actionText}
    </FlatButton>
  </Row>
);

export default Menu;
