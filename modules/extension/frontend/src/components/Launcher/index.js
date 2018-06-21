import React from "react";
import PropTypes from "prop-types";
import img from "assets/logo.png";
import Bubble from "components/Bubble";
import styled from "styled-components";

const LauncherContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #191b3b;
  box-shadow: 2px 3px 3px 0px rgba(41, 41, 41, 0.3);
  display: flex;

  cursor: pointer;
  position: fixed;
  z-index: 1000;
  bottom: 32px;
  right: 32px;

  &:hover {
    background-color: #191b3bef;
  }

  img {
    width: 32px;
    height: 32px;
  }

  .logo {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  * {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    outline: none;
  }
`;

export default class Launcher extends React.Component {
  static propTypes = {
    rules: PropTypes.number
  };

  static defaultProps = {
    rules: null
  };

  componentDidMount() {
    // Do something here for naimation?
  }

  render() {
    const { rules } = this.props;
    return (
      <LauncherContainer>
        <div>
          <img src={img} />
        </div>
        <Bubble value={rules} />
      </LauncherContainer>
    );
  }
}
