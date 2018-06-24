import React from "react";
import styled from "styled-components";

const Outline = styled.div`
  border: 4px dashed #8c8da0;
  width: ${props => props.width || 0};
  height: ${props => props.height || 0};
  position: absolute;
  border-radius: 20px;
  opacity: ${props => (props.hidden ? 0 : 1)};
  cursor: pointer;
  z-index: 0;
  left: ${props => props.left || 0};
  top: ${props => props.top || 0};
  padding: 4px;

  &:hover {
    border-color: #1e1e3e99;
  }

  .selected {
    border-color: #1e1e3e;
    z-index: 2;
  }
`;

export default Outline;
