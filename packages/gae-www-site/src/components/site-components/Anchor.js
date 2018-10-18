import styled from 'styled-components';
import { Button } from '@diff/shared-components';

const OverrideButton = styled(Button)`
  padding: 15px 45px;
  border-radius: 100px;
  background: linear-gradient(to bottom right, #4648b0, #6848b0);
  border: 0px;
  font-size: 1em;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;

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
