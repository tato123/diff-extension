import React from "react";
import MenuBubble from "./MenuBubble";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Bubble, Logo } from "@diff/shared-components";

const LauncherContainer = styled(MenuBubble)`
  z-index: 20;
  will-change: transform, opacity;

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

export default class MainMenu extends React.Component {
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
    showCount: PropTypes.bool,
    styles: PropTypes.object
  };

  static defaultProps = {
    count: null,
    showCount: true
  };

  render() {
    const {
      props: { count, showCount, onClick, styles }
    } = this;

    return (
      <LauncherContainer onClick={onClick} style={styles}>
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
    );
  }
}
