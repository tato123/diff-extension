import styled from 'styled-components';
import { Button } from '@diff/shared-components';

const OverrideButton = styled(Button)`
  padding: 10px 24px;
  border-radius: 8px;
  background: #43cad9 !important;
  border: 0px;
  font-size: 16px !important;
  color: #fff;
  text-transform: uppercase;
  font-weight: 500 !important;
  cursor: pointer;
  text-decoration: none;
  height: inherit;
  letter-spacing: 1px;

  &:focus {
    outline: 0;
    text-decoration: none;
  }

  &:hover {
    background: linear-gradient(to bottom right, #171a3a, #171a3a);
    text-decoration: none;
  }

  &:active {
    color: #00c9d9;
  }

  .small {
    padding: 10px 20px;
    font-size: 0.8em;
  }
`;

export default OverrideButton;
