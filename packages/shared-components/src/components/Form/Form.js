import React from "react";
import PropTypes from "prop-types";
// all of our available field types
import FormInput from "./styles/FormInput";
import FormField from "./styles/FormField";

const Form = ({ children, ...rest }) => <form {...rest}>{children}</form>;

Form.propTypes = {
  children: PropTypes.node.isRequired
};

// Implements most of our basic form types
Form.Input = FormInput;
Form.Field = FormField;

export default Form;
