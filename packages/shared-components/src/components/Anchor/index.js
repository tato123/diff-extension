import styled from "styled-components";
import { get } from "theme";

const Anchor = styled.a`
  cursor: pointer;
  color: ${get("colors.white")};
  transition: color 0.25s;

  &:hover {
    color: ${get("colors.white1")};
  }
`;

export default Anchor;
