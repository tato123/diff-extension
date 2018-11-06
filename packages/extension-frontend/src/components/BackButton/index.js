import React from 'react';
import { Icon } from 'react-icons-kit';
import { ic_keyboard_arrow_left as leftArrow } from 'react-icons-kit/md/ic_keyboard_arrow_left';
import styled from 'styled-components';

const StyleIcon = styled(Icon)`
  cursor: pointer;
  align-self: center;
  color: #fff;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export default ({ onClick, ...rest }) => (
  <StyleIcon size={20} icon={leftArrow} onClick={onClick} {...rest} />
);
