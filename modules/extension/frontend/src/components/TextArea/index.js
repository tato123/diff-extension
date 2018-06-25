import { Textarea } from "rebass";
import styled from "styled-components";

const TextAreaImpl = styled(Textarea)`
  border: 1px solid ${({ theme }) => theme.colors.white1} !important;
  border-radius: ${({ theme }) => theme.size.sm} !important;
  padding: ${({ theme }) => theme.size.sm} !important;
  box-sizing: border-box;
  resize: none;
  background: ${({ theme }) => theme.colors.white} !important;
  color: ${({ theme }) => theme.colors.black1} !important;
`;

export default TextAreaImpl;
