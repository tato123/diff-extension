import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get, remToSP } from 'theme';
import { get as lodashGet } from 'lodash-es';

const roundToMultiple = (val, multiple) =>
  Math.max(4, Math.round(val / multiple) * multiple);

const defaults = fontSize => ({ theme, uppercase }) => {
  const val = lodashGet(theme, fontSize);
  const digit = remToSP(val);
  const calculated = roundToMultiple(digit * 0.75, 4) / 2;

  return `
    margin: ${calculated}px 0;
    padding: 0;
    ${uppercase && 'text-transform: uppercase;'}
    vertical-align: baseline;
 `;
};

export const types = {
  h1: styled.h1`
    font-size: ${get('text.h1.fontSize')};
    font-weight: ${get('text.h1.fontWeight')};
    letter-spacing: ${get('text.h1.letterSpacing')};
    color: ${get('text.h1.color')};
    ${defaults('text.h1.fontSize')};
  `,
  h2: styled.h2`
    font-size: ${get('text.h2.fontSize')};
    font-weight: ${get('text.h2.fontWeight')};
    letter-spacing: ${get('text.h2.letterSpacing')};
    color: ${get('text.h2.color')};
    ${defaults('text.h2.fontSize')};
  `,
  h3: styled.h3`
    font-size: ${get('text.h3.fontSize')};
    font-weight: ${get('text.h3.fontWeight')};
    letter-spacing: ${get('text.h3.letterSpacing')};
    text-transform: uppercase;
    color: ${get('text.h3.color')};
    ${defaults('text.h3.fontSize')};
  `,
  h4: styled.h4`
    font-size: ${get('text.h4.fontSize')};
    font-weight: ${get('text.h4.fontWeight')};
    letter-spacing: ${get('text.h4.letterSpacing')};
    color: ${get('text.h4.color')};
    ${defaults('text.h4.fontSize')};
  `,
  h5: styled.h5`
    font-size: ${get('text.h5.fontSize')};
    font-weight: ${get('text.h5.fontWeight')};
    letter-spacing: ${get('text.h5.letterSpacing')};
    color: ${get('text.h5.color')};
    ${defaults('text.h5.fontSize')};
  `,
  h6: styled.h6`
    font-size: ${get('text.h6.fontSize')};
    font-weight: ${get('text.h6.fontWeight')};
    letter-spacing: ${get('text.h6.letterSpacing')};
    color: ${get('text.h6.color')};
    ${defaults('text.h6.fontSize')};
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
