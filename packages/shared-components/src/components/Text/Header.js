import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const types = {
  h1: styled.h1`
    margin: var(--df-space-0);
  `,
  h2: styled.h2`
    margin: var(--df-space-0);
  `,
  h3: styled.h3`
    margin: var(--df-space-0);
  `,
  h4: styled.h4`
    margin: var(--df-space-0);
  `,
  h5: styled.h5`
    margin: var(--df-space-0);
  `,
  h6: styled.h6`
    margin: var(--df-space-0);
  `
};

const Header = ({ as, children, ...rest }) => {
  const Element = as in types ? types[as] : types.overline;
  return <Element {...rest}>{children}</Element>;
};

Header.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  children: PropTypes.node
};

Header.defaultProps = {
  as: 'h1',
  children: null
};

export default Header;
