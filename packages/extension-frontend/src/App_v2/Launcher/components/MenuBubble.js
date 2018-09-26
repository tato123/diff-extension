import styled from "styled-components";
import { lighten } from "polished";

const MenuBubble = styled.div`
  width: ${props => props.size || 80}px;
  height: ${props => props.size || 80}px;
  border-radius: 50%;
  background-color: #191b3b;
  box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, 0.3);
  display: flex;
  will-change: transform;

  cursor: pointer;

  &:hover {
    background-color: ${lighten(0.05, "#191b3b")};
  }
`;

export default MenuBubble;
