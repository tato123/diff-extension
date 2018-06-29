import styled from "styled-components";

export default styled.div`
  display: block;
  margin: ${({ spacing }) => (spacing === "lg" ? "16px" : "8xp")} 0px;
`;
