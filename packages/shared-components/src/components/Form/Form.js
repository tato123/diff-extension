// all of our available field types
import FormInput from "./styles/FormInput";
import FormField from "./styles/FormField";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Implements most of our basic form types
Form.Input = FormInput;
Form.Field = FormField;

export default Form;
