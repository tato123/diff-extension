import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Label from "components/Text/Label";
import { get } from "theme";
import Icon from "react-icons-kit";
import { angleDown } from "react-icons-kit/fa/angleDown";

const StyledSelect = styled.div`
  box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.5);
  padding-left: ${({ theme }) => theme.size.sm} !important;
  padding-right: ${({ theme }) => theme.size.sm} !important;
  transition: all 150ms ease-in;
  background-color: transparent;
  will-change: transform, opacity, box-shadow, contents;
  cursor: pointer;
  padding: 8px;
  border-radius: ${get("size.borderRadius")};
  justify-content: space-between;
  flex: 1;
  display: flex;

  &:hover {
    box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.5);
  }

  &:visited {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const SelectLabel = styled(Label)`
  font-weight: 200 !important;
`;

const Select = ({ children, ...rest }) => (
  <StyledSelect>
    <SelectLabel as="button">{children}</SelectLabel>
    <Icon icon={angleDown} />
  </StyledSelect>
);

Select.propTypes = {
  children: PropTypes.node
}

export default Select;
