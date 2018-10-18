import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const types = {
  overline: styled.span``,
  caption: styled.span``,
  button: styled.span``,
  body2: styled.span``,
  body1: styled.span``,
  subtitle1: styled.span``,
  subtitle2: styled.span``
};

const Label = ({ as, children, ...rest }) => {
  const Element = as in types ? types[as] : types.overline;

  return <Element {...rest}>{children}</Element>;
};

Label.propTypes = {
  as: PropTypes.oneOf([
    'overline',
    'caption',
    'button',
    'body2',
    'body1',
    'subtitle1',
    'subtitle2'
  ]),
  children: PropTypes.node.isRequired
};

Label.defaultProps = {
  as: 'body1'
};

export default Label;
