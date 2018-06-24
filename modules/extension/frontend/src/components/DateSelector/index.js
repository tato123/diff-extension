import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { chevronDown } from "react-icons-kit/fa/chevron-down";

const Label = styled.label`
  text-transform: uppercase;
  display: block;
  margin-bottom: 6px;
  color: #fff;
  font-size: 12px;
`;

const Dropdown = styled.div`
  border: 1px solid var(--white);
  text-transform: uppercase;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: var(--white-2);
  }
`;

const FloatIcon = styled(Icon)`
  float: right;
`;

export default class DateSelector extends React.PureComponent {
  render() {
    return;
    <div>
      <Label>Date Range</Label>
      <Dropdown>
        <label>Since last visit</label>
        <FloatIcon icon={chevronDown} />
      </Dropdown>
    </div>;
  }
}
