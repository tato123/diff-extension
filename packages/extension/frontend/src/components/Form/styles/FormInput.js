import styled from "styled-components";

export default styled.input`
  outline: none;
  border-radius: 16px;
  padding: 10px;
  width: 100%;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #fff;

  &:hover {
    border-color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    border-color: #fff;
  }
`;
