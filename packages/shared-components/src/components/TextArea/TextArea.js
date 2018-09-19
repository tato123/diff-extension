import styled from "styled-components";
import { get } from "theme";

const TextAreaImpl = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.white1} !important;
  border-radius: ${get("size.borderRadius")};
  padding: ${({ theme }) => theme.size.sm} !important;
  box-sizing: border-box;
  resize: none;
  background: ${({ theme }) => theme.colors.white} !important;
  color: ${({ theme }) => theme.colors.black1} !important;
  font-size: 16px !important;
  display: block;
  width: 100%;

  &:focus,
  &:active {
    box-shadow: 0 0 0px 4px #43cad9;
  }
`;

export default TextAreaImpl;
