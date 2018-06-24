import React from "react";
import PropTypes from "prop-types";
import img from "assets/logo.png";
import Bubble from "components/Bubble";
import styled from "styled-components";
import Progress from "components/Progress";
import Widget from "components/Widget";

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

  > * {
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    outline: none;
  }

  > div {
    position: relative;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export default class Launcher extends React.Component {
  static propTypes = {
    busy: PropTypes.bool,
    count: PropTypes.oneOf(PropTypes.any, PropTypes.number),
    onClick: PropTypes.func
  };

  static defaultProps = {
    busy: false,
    count: null,
    onClick: () => {}
  };

  render() {
    const {
      props: { count, busy, onClick }
    } = this;
    return (
      <Widget>
        <LauncherContainer onClick={onClick}>
          <div>
            {!busy && (
              <React.Fragment>
                <ImgContainer>
                  <img src={img} />
                </ImgContainer>
                <Bubble value={count} />
              </React.Fragment>
            )}
            {busy && (
              <React.Fragment>
                <Progress.Circle />
              </React.Fragment>
            )}
          </div>
        </LauncherContainer>
      </Widget>
    );
  }
}
