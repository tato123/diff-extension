import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { get } from "theme";

export const types = {
  overline: styled.span`
    font-size: ${get("text.overline.fontSize")};
    font-weight: ${get("text.overline.fontWeight")};
    letter-spacing: ${get("text.overline.letterSpacing")};
    text-transform: uppercase;
  `,
  caption: styled.span`
    font-size: ${get("text.caption.fontSize")};
    font-weight: ${get("text.caption.fontWeight")};
    letter-spacing: ${get("text.caption.letterSpacing")};
  `,
  button: styled.span`
    font-size: ${get("text.button.fontSize")};
    font-weight: ${get("text.button.fontWeight")};
    letter-spacing: ${get("text.button.letterSpacing")};
    text-transform: uppercase;
  `,
  body2: styled.span`
    font-size: ${get("text.body2.fontSize")};
    font-weight: ${get("text.body2.fontWeight")};
    letter-spacing: ${get("text.body2.letterSpacing")};
  `,
  body1: styled.span`
    font-size: ${get("text.body1.fontSize")};
    font-weight: ${get("text.body1.fontWeight")};
    letter-spacing: ${get("text.body1.letterSpacing")};
  `,
  subtitle1: styled.span`
    font-size: ${get("text.subtitle1.fontSize")};
    font-weight: ${get("text.subtitle1.fontWeight")};
    letter-spacing: ${get("text.subtitle1.letterSpacing")};
  `,
  subtitle2: styled.span`
    font-size: ${get("text.subtitle2.fontSize")};
    font-weight: ${get("text.subtitle2.fontWeight")};
    letter-spacing: ${get("text.subtitle2.letterSpacing")};
  `
};

const Label = ({ as, children, ...rest }) => {
  const Element = as in types ? types[as] : types.overline;

  return <Element {...rest}>{children}</Element>;
};

Label.propTypes = {
  as: PropTypes.oneOf([
    "overline",
    "caption",
    "button",
    "body2",
    "body1",
    "subtitle1",
    "subtitle2"
  ]),
  children: PropTypes.node
};

export default Label;
