import styled from "styled-components";
import { Label } from "components/Text";
import { colors } from "theme";

export default styled(Label)`
  color: ${({ type, theme }) => {
    switch (type) {
      case "from":
        return colors.red;
      case "to":
        return colors.green;
      default:
        return colors.white;
    }
  }};
  margin: 0 0.2em;
  display: ${({ inline = false }) => (inline ? "inline" : "block")};
`;
