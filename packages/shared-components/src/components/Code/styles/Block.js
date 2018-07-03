import React from "react";
import PropTypes from "prop-types";
import { Label } from "components/Text";
import styled from "styled-components";

const BlockContainer = styled.div`
  display: block;
  margin: 0.5em 0;

  .code {
    font-family: "Roboto Mono", monospace;

    label,
    label:not(:first-child),
    span {
      font-size: 13px !important;
      text-transform: none !important;
    }
  }
`;

const BlockLabel = styled(Label)`
  display: block;
  margin-bottom: 0.3em;
`;

const CodeBlock = ({ children, label }) => {
  return (
    <BlockContainer>
      <BlockLabel as="subtitle1">{label}</BlockLabel>
      <span className="code">{children}</span>
    </BlockContainer>
  );
};

CodeBlock.propTypes = {
  label: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default CodeBlock;
