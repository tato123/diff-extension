import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Flat from "./Flat";
import Loading from "./Loading";

const ButtonStyled = styled(Flat)`
  box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
  transition: box-shadow 25ms ease-in;
  will-change: transform, opacity, box-shadow, contents;
  font-weight: 200 !important;

  &:hover {
    box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.9);
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
