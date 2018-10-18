import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;

  cursor: pointer;
  padding: 0 8px;

  text-transform: uppercase;
  transition: all 150ms ease-in;
  will-change: transform, opacity;
  height: 36px;
  user-select: none;
  -webkit-appearance: none;
  overflow: hidden;
  vertical-align: middle;
  position: relative;

  &:before {
    content: '';
    opacity: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    transition: opacity 15ms linear;
  }

  &:hover:before {
    opacity: 0.2;
  }

  &:focus,
  &:active {
    box-shadow: 0 0 0px 4px #43cad9;
  }
`;

export default Button;
