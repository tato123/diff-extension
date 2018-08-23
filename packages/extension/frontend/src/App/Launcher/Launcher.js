import React from "react";
import PropTypes from "prop-types";
import { Spring, Transition } from "react-spring";
import styled from "styled-components";
import { TimingAnimation, Easing } from "react-spring/dist/addons";

import MainMenu from "./components/MainMenu";
import CloseButton from "./components/CloseButton";
import WorkspaceButton from "./components/WorkspaceButton";

const MenuGroup = styled.div`
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
    showCount: PropTypes.bool,

    showWidget: PropTypes.func.isRequired,

    hideWidget: PropTypes.func.isRequired
  };

  static defaultProps = {
    count: null,
    showCount: true
  };

  state = {
    showClose: false,
    showWorkspace: false
  };

  onMenuClick = () => {
    this.props.onClick(true);
    this.setState({ showClose: true });
  };

  onCloseClick = () => {
    this.props.onClick(false);
    this.setState({ showClose: false, showWorkspace: false });
  };

  onWorkspaceClick = () => {
    const WORKSPACE = "workspace";

    if (this.state.showWorkspace) {
      this.props.hideWidget(WORKSPACE);
      this.setState({ showWorkspace: false });
    } else {
      this.props.showWidget(WORKSPACE);
      this.setState({ showWorkspace: true });
    }
  };

  animationVelocity = 18;

  closeMenuOption = () => {
    const {
      state: { showClose }
    } = this;

    return (
      <Spring
        config={{ velocity: this.animationVelocity }}
        size={36}
        from={{
          transform: "translate(120px)",
          position: "relative"
        }}
        to={{
          transform: showClose ? "translate(0px)" : "translate(120px)"
        }}
        onClick={this.onCloseClick}
        render={CloseButton}
      />
    );
  };

  workspaceMenuOption = () => {
    const {
      state: { showClose, showWorkspace }
    } = this;

    return (
      <Spring
        config={{ velocity: this.animationVelocity }}
        size={36}
        from={{
          transform: "translate(75px)",
          position: "relative",
          backgroundColor: showWorkspace ? "#43cad9" : "#1a1b3c"
        }}
        to={{
          transform: showClose ? "translate(0px)" : "translate(75px)",
          backgroundColor: showWorkspace ? "#43cad9" : "#1a1b3c"
        }}
        onClick={this.onWorkspaceClick}
        render={WorkspaceButton}
      />
    );
  };

  render() {
    const {
      props: { count, showCount }
    } = this;
    return (
      <MenuGroup>
        <Transition
          impl={TimingAnimation}
          config={{ duration: 200, easing: Easing.linear }}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {styles => (
            <React.Fragment>
              {styles.opacity === 1 && this.closeMenuOption()}
              {styles.opacity === 1 && this.workspaceMenuOption()}
              <MainMenu
                count={count}
                showCount={showCount}
                onClick={this.onMenuClick}
                styles={styles}
              />
            </React.Fragment>
          )}
        </Transition>
      </MenuGroup>
    );
  }
}
