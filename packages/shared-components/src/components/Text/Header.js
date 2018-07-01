import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { get } from "theme";

const defaults = ({ uppercase }) => `
  margin: 1em 0;
  padding: 0;
  ${uppercase && "text-transform: uppercase;"}
`;

export const types = {
  h1: styled.h1`
    font-size: ${get("text.h1.fontSize")};
    font-weight: ${get("text.h1.fontWeight")};
    letter-spacing: ${get("text.h1.letterSpacing")};
    ${defaults};
  `,
  h2: styled.h2`
    font-size: ${get("text.h2.fontSize")};
    font-weight: ${get("text.h2.fontWeight")};
    letter-spacing: ${get("text.h2.letterSpacing")};
    ${defaults};
  `,
  h3: styled.h3`
    font-size: ${get("text.h3.fontSize")};
    font-weight: ${get("text.h3.fontWeight")};
    letter-spacing: ${get("text.h3.letterSpacing")};
    text-transform: uppercase;
    ${defaults};
  `,
  h4: styled.h4`
    font-size: ${get("text.h4.fontSize")};
    font-weight: ${get("text.h4.fontWeight")};
    letter-spacing: ${get("text.h4.letterSpacing")};
    ${defaults};
  `,
  h5: styled.h5`
    font-size: ${get("text.h5.fontSize")};
    font-weight: ${get("text.h5.fontWeight")};
    letter-spacing: ${get("text.h5.letterSpacing")};
    ${defaults};
  `,
  h6: styled.h6`
    font-size: ${get("text.h6.fontSize")};
    font-weight: ${get("text.h6.fontWeight")};
    letter-spacing: ${get("text.h6.letterSpacing")};
    ${defaults};
  `
};

const Header = ({ as, children, ...rest }) => {
  const Element = as in types ? types[as] : types.overline;

  return <Element {...rest}>{children}</Element>;
};

Header.propTypes = {
  as: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  children: PropTypes.node
};

export default Header;
