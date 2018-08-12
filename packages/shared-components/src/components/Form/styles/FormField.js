import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { get } from "theme";
import { Label } from "components/Text";

// prettier-ignore
const FormFieldContainer = styled.div`
  margin: 0 0 ${get("size.grid.grid-2")};
  clear: both;
  will-change: transform, opacity;
  
  ${props => props.hide && 'transform: translate(-1000px, -1000px)' }

  label,
  span {
    display: block;
    margin: 0 0 12px 0;
  }

  input {
    margin: 0;
    outline: 0;
    -webkit-appearance: none;
    tap-highlight-color: rgba(255, 255, 255, 0);
    line-height: 1.21428571em;
    padding: 8px;
    font-size: 16px;
    background: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
    color: rgba(0, 0, 0, 0.87);
    border-radius: ${get("size.borderRadius")};
    -webkit-box-shadow: 0 0 0 0 transparent inset;
    box-shadow: 0 0 0 0 transparent inset;
    -webkit-transition: color 0.1s ease, border-color 0.1s ease;
    transition: color 0.1s ease, border-color 0.1s ease;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;

    ${props =>
      props.error
        ? "box-shadow: 0 0 0px 3px #C51162 !important;"
        : " box-shadow: 0 0 0px 0px #43cad9;"};
  }
  input:focus,
  input:active {
    box-shadow: 0 0 0px 4px #43cad9;
  }
`;

const Required = styled.span`
  display: inline !important;
  color: #c51162;
`;

const ErrorLabel = styled(Label)`
  color: #c51162;
  margin: 4px 0px 0px 0px !important;
  font-size: 16px;
  padding-bottom: 0px;
`;

const FormField = ({ label, hide, name, error, required, children, style }) => (
  <FormFieldContainer error={error} className="field" style={style} hide={hide}>
    <Label as="subtitle2" for={name}>
      {label} {required && <Required>*</Required>}
    </Label>
    {children}
    <ErrorLabel as="subtitle2">{error}</ErrorLabel>
  </FormFieldContainer>
);

FormField.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node.isRequired
};

FormField.defaultProps = {
  label: null
};

export default FormField;
