import color from "color";
import lodashGet from "lodash.get";

export const get = val => props => {
  return lodashGet(props.theme, val);
};

const TRACKING = 0.2;
const REM = 16;

const remRatio = sp => `${sp / REM}rem`;

export const remToSP = rem => {
  if (typeof rem === "string" && rem.indexOf("rem") !== -1) {
    return parseFloat(rem.replace("rem", "")) * REM;
  }
  if (typeof rem === "string" && rem.indexOf("em") !== -1) {
    return parseFloat(rem.replace("em", "")) * REM;
  }
  return rem * REM;
};

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

// BASED ON THE 4DP GRID IN MATERIAL DESIGN,
// DP = DISPLAY UNIT = PX IN WEB
const GRID_DP_BASELINE = 4;

const size = {
  sm: `${GRID_DP_BASELINE}px`,
  borderRadius: remRatio(3.2),
  grid: {
    ...new Array(20).fill(0).reduce(
      (acc, val, idx) => ({
        ...acc,
        [`grid-${idx + 1}`]: `${(idx + 1) * GRID_DP_BASELINE}px`
      }),
      {}
    )
  }
};

// based on the material.io type scale
// @see https://material.io/design/typography/the-type-system.html#type-scale
const text = {
  fontFamily: "'Barlow Semi Condensed', sans-serif",
  overline: {
    fontSize: "9px",
    fontWeight: 400,
    letterSpacing: toLetterSpacing(1.5)
  },
  caption: {
    fontSize: "10px",
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.4)
  },
  button: {
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "1.1px"
  },
  body2: {
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.25)
  },
  body1: {
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.5)
  },
  subtitle2: {
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: toLetterSpacing(0.1)
  },
  subtitle1: {
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.15)
  },
  h6: {
    fontSize: "10px",
    fontWeight: 500,
    letterSpacing: toLetterSpacing(0.15)
  },
  h5: {
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0)
  },
  h4: {
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0.25)
  },
  h3: {
    fontSize: "18px",
    fontWeight: 400,
    letterSpacing: toLetterSpacing(0)
  },
  h2: {
    fontSize: "24px",
    fontWeight: 200,
    letterSpacing: toLetterSpacing(-0.5)
  },
  h1: {
    fontSize: "32px",
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
