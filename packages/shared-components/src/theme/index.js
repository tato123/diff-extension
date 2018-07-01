import color from "color";
import lodashGet from "lodash.get";

export const get = val => props => {
  return lodashGet(props.theme, val);
};

const white = "rgb(255, 255, 255)";
const white1 = color(white)
  .fade(0.5)
  .string();

const black1 = "rgba(0,0,0,1)";

const colors = {
  textColor: white,
  white,
  white1,
  border: white1,
  black1
};

const size = {
  sm: "8px"
};

const TRACKING = 0.2;
const REM = 16;

const toFontSize = sp => `${sp / REM}em`;

const toLetterSpacing = sp => `${TRACKING / REM}em`;

// based on the material.io type scale
// @see https://material.io/design/typography/the-type-system.html#type-scale
const text = {
  fontFamily: "'Barlow Semi Condensed', sans-serif",
  overline: {
    fontSize: toFontSize(10),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(1.5)
  },
  caption: {
    fontSize: toFontSize(12),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.4)
  },
  button: {
    fontSize: toFontSize(14),
    fontWeight: 500,
    letterSpacing: toLetterSpacing(0.75)
  },
  body2: {
    fontSize: toFontSize(14),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.25)
  },
  body1: {
    fontSize: toFontSize(16),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.5)
  },
  subtitle2: {
    fontSize: toFontSize(14),
    fontWeight: 500,
    letterSpacing: toLetterSpacing(0.1)
  },
  subtitle1: {
    fontSize: toFontSize(16),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.15)
  },
  h6: {
    fontSize: toFontSize(20),
    fontWeight: 500,
    letterSpacing: toLetterSpacing(0.15)
  },
  h5: {
    fontSize: toFontSize(24),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0)
  },
  h4: {
    fontSize: toFontSize(34),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.25)
  },
  h3: {
    fontSize: toFontSize(48),
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0)
  },
  h2: {
    fontSize: toFontSize(60),
    fontWeight: 200,
    letterSpacing: toLetterSpacing(-0.5)
  },
  h1: {
    fontSize: toFontSize(96),
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
