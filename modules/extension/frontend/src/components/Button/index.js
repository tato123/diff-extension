import styled from "styled-components";
import { Button, ButtonOutline, ButtonCircle } from "rebass";

const ButtonImpl = styled(ButtonOutline)`
  background: transparent !important;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3) !important;
  border-radius: 8px !important;
  font-weight: 200 !important;
  cursor: pointer;

  &:hover {
    background: #fff !important;
  }
`;

ButtonImpl.Solid = styled(Button)``;

ButtonImpl.Circle = styled(ButtonCircle)``;

export default ButtonImpl;
