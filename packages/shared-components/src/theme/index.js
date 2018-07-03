import color from "color";
import lodashGet from "lodash.get";

export const get = val => props => {
  return lodashGet(props.theme, val);
};

const TRACKING = 0.2;
const REM = 16;

const remRatio = sp => `${sp / REM}rem`;

const toLetterSpacing = sp => `${TRACKING / REM}rem`;

const white = "rgb(255, 255, 255)";
const white1 = color(white)
  .fade(0.5)
  .string();
const green = "#22B573";
const red = "#EF3B7B";

const black1 = "rgba(0,0,0,1)";

export const colors = {
  textColor: white,
  white,
  white1,
  border: white1,
  black1,
  green,
  red
};

const size = {
  sm: "8px",
  borderRadius: remRatio(3.2)
};

// based on the material.io type scale
// @see https://material.io/design/typography/the-type-system.html#type-scale
const text = {
  fontFamily: "'Barlow Semi Condensed', sans-serif",
  overline: {
    fontSize: remRatio(10),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(1.5)
  },
  caption: {
    fontSize: remRatio(12),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.4)
  },
  button: {
    fontSize: remRatio(14),
    fontWeight: 500,
    letterSpacing: toLetterSpacing(0.75)
  },
  body2: {
    fontSize: remRatio(14),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.25)
  },
  body1: {
    fontSize: remRatio(16),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.5)
  },
  subtitle2: {
    fontSize: remRatio(14),
    fontWeight: 500,
    letterSpacing: toLetterSpacing(0.1)
  },
  subtitle1: {
    fontSize: remRatio(16),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.15)
  },
  h6: {
    fontSize: remRatio(20),
    fontWeight: 500,
    letterSpacing: toLetterSpacing(0.15)
  },
  h5: {
    fontSize: remRatio(24),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0)
  },
  h4: {
    fontSize: remRatio(34),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.25)
  },
  h3: {
    fontSize: remRatio(48),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0)
  },
  h2: {
    fontSize: remRatio(60),
    fontWeight: 200,
    letterSpacing: toLetterSpacing(-0.5)
  },
  h1: {
    fontSize: remRatio(96),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(-1.5)
  }
};

const Theme = {
  colors,
  text,
  size
};

export default Theme;
