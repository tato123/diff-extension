import React from "react";
import MenuBubble from "./MenuBubble";

import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { ic_close as iconClose } from "react-icons-kit/md/ic_close";
import styled from "styled-components";

const CloseBubble = styled(MenuBubble)`
  cursor: pointer;
  z-index: 2;
  will-change: transform;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const CloseButton = ({ size, onClick, ...styles }) => (
  <CloseBubble size={size} style={styles} onClick={onClick}>
    <Icon icon={iconClose} />
  </CloseBubble>
);

CloseButton.propTypes = {
  size: PropTypes.number,
  onClick: PropTypes.func
};

CloseButton.defaultProps = {
  size: 16,
  onClick: () => {}
};

export default CloseButton;
