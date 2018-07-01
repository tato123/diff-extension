import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { get } from "theme";
import { Label } from "components/Text";

const FormFieldContainer = styled.div`
  margin: 0 0 1em;
  clear: both;

  label,
  span {
    display: block;
    margin: 0 0 0.28571429rem 0;
  }

  input {
    margin: 0;
    outline: 0;
    -webkit-appearance: none;
    tap-highlight-color: rgba(255, 255, 255, 0);
    line-height: 1.21428571em;
    padding: 0.67857143em 1em;
    font-size: 1em;
    background: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
    color: rgba(0, 0, 0, 0.87);
    border-radius: ${get("size.borderRadius")};
    -webkit-box-shadow: 0 0 0 0 transparent inset;
    box-shadow: 0 0 0 0 transparent inset;
    -webkit-transition: color 0.1s ease, border-color 0.1s ease;
    transition: color 0.1s ease, border-color 0.1s ease;
    width: 100%;
  }
`;

const FormField = ({ label, children }) => (
  <FormFieldContainer className="field">
    <Label as="subtitle2">{label}</Label>

    {children}
  </FormFieldContainer>
);

FormField.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired
};

FormField.defaultProps = {
  label: null
};

export default FormField;
