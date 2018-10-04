import styled from 'styled-components';

const TextAreaImpl = styled.textarea`
  box-sizing: border-box;
  resize: none;

  font-size: 16px !important;
  display: block;
  width: 100%;

  &:focus,
  &:active {
    box-shadow: 0 0 0px 4px #43cad9;
  }
`;

export default TextAreaImpl;
