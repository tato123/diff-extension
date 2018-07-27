import styled from "styled-components";
import { get } from "theme";

const Button = styled.button`
  font-family: ${get("text.fontFamily")};
  background-color: transparent;
  border: none;
  outline: none;

  border-radius: ${get("size.borderRadius")};

  cursor: pointer;
  color: ${get("colors.textColor")};
  padding: 0 8px;

  font-size: ${get("text.button.fontSize")};
  font-weight: ${get("text.button.fontWeight")};
  letter-spacing: ${get("text.button.letterSpacing")};
  text-transform: uppercase;
  transition: all 150ms ease-in;
  will-change: transform, opacity;
  height: 36px;
  user-select: none;
  -webkit-appearance: none;
  overflow: hidden;
  vertical-align: middle;
  position: relative;

  &:before {
    content: "";
    opacity: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    position: absolute;
    border-radius: ${get("size.borderRadius")};
    z-index: 1;
    top: 0px;
    left: 0px
    transition: opacity 15ms linear;
  }

  &:hover:before {
    opacity: 0.2;
  }
`;

export default Button;
