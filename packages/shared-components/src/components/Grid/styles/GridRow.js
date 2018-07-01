import styled from "styled-components";
import { modularScale } from "polished";

export default styled.div`
  margin: ${({ scale = 1 }) => modularScale(scale)} 0;
`;
