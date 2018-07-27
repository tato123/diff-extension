import React from "react";
import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { paperclip } from "react-icons-kit/fa/paperclip";
import { Label, Anchor } from "@diff/shared-components";
import styled from "styled-components";

const StyledIcon = styled(Icon)`
  margin: 0px;
  margin-right: 8px;
  position: relative;
  top: 2px;
`;

const AttachmentAnchor = styled(Anchor)`
  text-decoration: none;
`;

const Attachment = ({ name, url }) => (
  <div>
    <StyledIcon icon={paperclip} />
    {!url && <Label>{name}</Label>}
    {url && (
      <AttachmentAnchor href={url} target="_blank">
        {name}
      </AttachmentAnchor>
    )}
  </div>
);

Attachment.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default Attachment;
