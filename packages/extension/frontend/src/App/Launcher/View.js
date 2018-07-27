import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { StyleBoundary, Progress, Bubble, Logo } from "@diff/shared-components";

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
    flex: 1;
  }
`;

const BubbleContainer = styled.div`
  position: absolute;
  right: 0px;
  top: -10px;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  height: 100%;
`;

/**
 * Launcher is the main widget on our page, it handles
 * the primary function of displaying diff counts and enabling
 * our users to interact with or show the diff inspector
 */
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
    /**
     * Enable or disable visibilty of the count
     */
    showCount: PropTypes.bool
  };

  static defaultProps = {
    count: null,
    onClick: () => {},
    showCount: true
  };

  render() {
    const {
      props: { count, onClick, showCount }
    } = this;
    return (
      <StyleBoundary>
        <LauncherContainer onClick={onClick}>
          <div>
            <React.Fragment>
              <ImgContainer>
                <Logo />
              </ImgContainer>
              {showCount && (
                <BubbleContainer>
                  <Bubble value={count} />
                </BubbleContainer>
              )}
            </React.Fragment>
          </div>
        </LauncherContainer>
      </StyleBoundary>
    );
  }
}
