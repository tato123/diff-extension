import color from "color";

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

const text = {
  fontFamily: `"Inter UI", sans-serif`,
  lineHeight: 1.5,
  size: {
    small: "0.7em",
    normal: "1em"
  }
};

const Theme = {
  colors,
  text,
  size
};

export default Theme;
