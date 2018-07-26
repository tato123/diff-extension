import React from "react";
import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { paperclip } from "react-icons-kit/fa/paperclip";
import { Label, Anchor } from "@diff/shared-components";

const Attachment = ({ name, url }) => (
  <div>
    <Icon icon={paperclip} />
    {!url && <Label>{name}</Label>}
    {url && (
      <Anchor href={url} target="_blank">
        {name}
      </Anchor>
    )}
  </div>
);

Attachment.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default Attachment;
