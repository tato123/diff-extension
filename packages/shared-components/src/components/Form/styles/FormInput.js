import React from "react";
import PropTypes from "prop-types";

import FormField from "./FormField";

const FormInput = ({ children, hide, style, ...rest }) => (
  <FormField style={style} {...rest} hide={hide}>
    <input {...rest} />
  </FormField>
);

FormInput.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any
};

FormInput.defaultProps = {
  style: {},
  children: null
};

export default FormInput;
