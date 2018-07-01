import styled from "styled-components";

const FormRow = styled.div`
  display: block;
  margin: ${({ spacing }) => (spacing === "lg" ? "16px" : "8xp")} 0px;
`;

FormRow.displayName = "Form.Row";

export default FormRow;
