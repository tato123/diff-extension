import styled from "styled-components";
import { Select } from "rebass";

const StyledSelect = styled(Select)`
  border: 1px solid ${({ theme }) => theme.colors.border} !important;
  padding-left: ${({ theme }) => theme.size.sm} !important;
  padding-right: ${({ theme }) => theme.size.sm} !important;
  border-radius: ${({ theme }) => theme.size.sm} !important;
  text-transform: uppercase !important;
  font-size: 14px !important;
  font-weight: 200 !important;
`;

export default StyledSelect;
