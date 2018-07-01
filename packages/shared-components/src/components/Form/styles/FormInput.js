import React from "react";
import PropTypes from "prop-types";

import FormField from "./FormField";

const FormInput = ({ type, value, placeholder, name, ...rest }) => (
  <FormField {...rest}>
    <input type={type} value={value} placeholder={placeholder} name={name} />
  </FormField>
);

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["password", "email", "text"]),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string
};

FormInput.defaultProps = {
  label: null,
  value: null,
  type: "text",
  placeholder: null,
  name: null
};

export default FormInput;
