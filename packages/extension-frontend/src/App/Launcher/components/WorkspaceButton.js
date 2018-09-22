import React from "react";
import MenuBubble from "./MenuBubble";

import PropTypes from "prop-types";
import Icon from "react-icons-kit";
import { user } from "react-icons-kit/fa/user";
import styled from "styled-components";

const WorkspaceBubble = styled(MenuBubble)`
  cursor: pointer;
  z-index: 2;
  will-change: transform;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 48px;
  width: 48px;
`;

const WorkspaceButton = ({ size, onClick, ...styles }) => (
  <WorkspaceBubble size={size} style={styles} onClick={onClick}>
    <Icon icon={user} />
  </WorkspaceBubble>
);

WorkspaceButton.propTypes = {
  size: PropTypes.number,
  onClick: PropTypes.func
};

WorkspaceButton.defaultProps = {
  size: 16,
  onClick: () => {}
};

export default WorkspaceButton;
