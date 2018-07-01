import { Tabs as RebassTabs, Tab as RebassTab } from "rebass";
import styled from "styled-components";
import { get } from "theme";

const Tabs = styled(RebassTabs)`
  min-height: 30px;
`;

/* prettier-ignore */
Tabs.Tab = styled(RebassTab)`
  cursor: pointer;
  font-size: ${get("text.button.fontSize")} !important;
  font-weight: ${get("text.button.fontWeight")} !important;
  letter-spacing: ${get("text.button.letterSpacing")} !important;
  text-transform: uppercase;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.white : "#aaa"} !important;
  position: relative;
  transition: all 250ms ease-out !important;

  &::after {
    content: '';
    z-index: 1;
    position: absolute;
    width: 100%;
    
    
    left: 0px;
    background: white;
    ${({ selected }) => selected ? "height: 2px;" : "height: 0px;"}
    ${({ selected }) => selected ? "bottom: -4px;" : "bottom: -8px;"}
  }

  
  
  &:hover {
    color: gray !important;
  }
`;

export default Tabs;
