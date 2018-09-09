import React from "react";
import PropTypes from "prop-types";

import FormField from "./FormField";

const FormInput = ({ children, hide, style, render, ...rest }) => (
  <FormField style={style} {...rest} hide={hide}>
    {render && render(rest)}
    {!render && <input {...rest} />}
  </FormField>
);

FormInput.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
  render: PropTypes.func
};

FormInput.defaultProps = {
  style: {},
  render: null,
  children: null
};

export default FormInput;
