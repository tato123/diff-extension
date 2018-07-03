import styled from "styled-components";

const margin = val => props => {
  if (props[val] === "xs") {
    return `margin-${val}: 0.25em`;
  }
  if (props[val] === "sm") {
    return `margin-${val}: 0.5em`;
  }
  if (props[val] === "md") {
    return `margin-${val}: 1em`;
  }
  if (props[val] === "lg") {
    return `margin-${val}: 1.5em`;
  }
};

export default styled.span`
  ${margin("right")};
  ${margin("left")};
  ${margin("top")};
  ${margin("down")};
`;
