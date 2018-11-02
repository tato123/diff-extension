import React from 'react';
import { Icon } from 'react-icons-kit';
import styled from 'styled-components';

const IconButtonStyled = styled.button`
  display: inline-block;
  box-shadow: none;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  transition: opacity 120ms ease-in;

  ${props => (props.disabled && 'opacity: 0.5; cursor: disabled;') || ''};

  border-radius: 4px;
  cursor: pointer;
  ${props => props.color && `color: ${props.color}`};

  &:hover {
    background: var(--df-hover-color);
  }

  > div {
    padding: 4px;
    margin: 0 !important;
  }

  &:disabled {
    cursor: disabled;
  }

  &:focus,
  &:active {
    box-shadow: inset 0 0 0px 2px var(--df-text-color-highlight) !important;
  }
`;

const IconButton = ({ children, icon, ...rest }) => (
  <IconButtonStyled {...rest}>
    <Icon icon={icon} />
    {children}
  </IconButtonStyled>
);

export default IconButton;
