import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { get } from "theme";

export const types = {
  h1: styled.span`
    font-size: ${get("text.h1.fontSize")};
    font-weight: ${get("text.h1.fontWeight")};
    letter-spacing: ${get("text.h1.letterSpacing")};
  `,
  h2: styled.span`
    font-size: ${get("text.h2.fontSize")};
    font-weight: ${get("text.h2.fontWeight")};
    letter-spacing: ${get("text.h2.letterSpacing")};
  `,
  h3: styled.span`
    font-size: ${get("text.h3.fontSize")};
    font-weight: ${get("text.h3.fontWeight")};
    letter-spacing: ${get("text.h3.letterSpacing")};
    text-transform: uppercase;
  `,
  h4: styled.span`
    font-size: ${get("text.h4.fontSize")};
    font-weight: ${get("text.h4.fontWeight")};
    letter-spacing: ${get("text.h4.letterSpacing")};
  `,
  h5: styled.span`
    font-size: ${get("text.h5.fontSize")};
    font-weight: ${get("text.h5.fontWeight")};
    letter-spacing: ${get("text.h5.letterSpacing")};
  `,
  h6: styled.span`
    font-size: ${get("text.h6.fontSize")};
    font-weight: ${get("text.h6.fontWeight")};
    letter-spacing: ${get("text.h6.letterSpacing")};
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
