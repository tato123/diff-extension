import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Flat from './Flat';
import Loading from './Loading';

// prettier-ignore
const ButtonStyled = styled(Flat)`
  box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
  transition: box-shadow 25ms ease-in;
  will-change: transform, opacity, box-shadow, contents;
  font-weight: 200 !important;
  background-color: ${props => props.primary ? '#43cad9' : 'transparent'}; 
  border-radius: 4px;
  ${props => props.primary && 'color: #fff;'}

  &:disabled {
    background-color: ${props => props.primary ? '#29748d' : '#ccc'};
    box-shadow: none !important;
    cursor: default;

    &:hover:before {
      opacity: 0;
    }
  }


  &:hover {
    box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.9);
  }

   &:focus,
  &:active {
    box-shadow: 0 0 0px 4px ${props => props.primary ? '#fff' : '43cad9'};
  }

  
`;

const Button = ({ loading, children, ...rest }) => (
  <ButtonStyled {...rest}>
    {!loading && children}
    {loading && <Loading />}
  </ButtonStyled>
);

Button.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.node
  ])
};

export default Button;
