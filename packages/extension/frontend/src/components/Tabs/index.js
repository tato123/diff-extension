import { Tabs, Tab } from "rebass";
import styled from "styled-components";

const TabsImpl = styled(Tabs)`
  min-height: 30px;
`;

/* prettier-ignore */
TabsImpl.Tab = styled(Tab)`
  cursor: pointer;
  font-size: ${({ theme }) => theme.text.size.small} !important;
  font-weight: 200 !important;
  text-transform: uppercase;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.white : "#aaa"} !important;

  ${({ selected }) => selected && "border-bottom: 1px solid #fff !important;"}
  
  &:hover {
    color: gray !important;
  }
`;

export default TabsImpl;
