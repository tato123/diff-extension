import styled from "styled-components";
import Flat from "./Flat";

const Button = styled(Flat)`
  box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
  transition: box-shadow 25ms ease-in;
  will-change: transform, opacity, box-shadow, contents;
  font-weight: 200 !important;

  &:hover {
    box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.9);
  }
`;

export default Button;
