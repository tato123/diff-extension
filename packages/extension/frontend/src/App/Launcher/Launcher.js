import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import MainMenu from "./components/MainMenu";

const LauncherContainer = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 32px;
  right: 32px;
  display: flex;
  align-items: center;

  > div {
    margin-right: 16px;
  }
`;

export default class Launcher extends React.Component {
  static propTypes = {
    /**
     * Diff Count
     */
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Pass this through to parent element
     */
    onClick: PropTypes.func,

    open: PropTypes.bool
  };

  static defaultProps = {
    count: null,
    open: true
  };

  render() {
    const {
      props: { count, onClick }
    } = this;
    return (
      <LauncherContainer>
        <MainMenu count={count} showCount onClick={onClick} />
      </LauncherContainer>
    );
  }
}
