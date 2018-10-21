import React from 'react';
import styled from 'styled-components';

/* prettier-ignore */
const StyledOutline = styled.div`
  outline: 2px dashed #8c8da0;
  width: ${props => props.width || 0};
  height: ${props => props.height || 0};
  position: absolute;
  border-radius: 35px;
  opacity: ${props => (props.hidden ? 0 : 1)};
  cursor: pointer;
  z-index: 0;
  left: ${props => props.left || 0};
  top: ${props => props.top || 0};
  padding: 4px;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);



  &:hover {
    border-color: #1e1e3e99;
  }
  
`;

const Outline = ({ children, ...rest }) => (
  <StyledOutline {...rest}>{children}</StyledOutline>
);

export default Outline;
