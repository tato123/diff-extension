import React from "react";
import PropTypes from "prop-types";
import { StyleBoundary } from "@diff/shared-components";
import { Spring, Transition } from "react-spring";
import styled from "styled-components";

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
    this.setState({ showClose: false });
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

  closeMenuOption = () => {
    const {
      state: { showClose }
    } = this;

    return (
      <Spring
        config={{ velocity: 15 }}
        size={36}
        from={{
          transform: "translate(75px)",
          position: "relative"
        }}
        to={{
          transform: showClose ? "translate(0px)" : "translate(75px)"
        }}
        onClick={this.onCloseClick}
        render={CloseButton}
      />
    );
  };

  workspaceMenuOption = () => {
    const {
      state: { showClose }
    } = this;

    return (
      <Spring
        config={{ velocity: 15 }}
        size={36}
        from={{
          transform: "translate(75px)",
          position: "relative"
        }}
        to={{
          transform: showClose ? "translate(0px)" : "translate(75px)"
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
      <StyleBoundary>
        <MenuGroup>
          <Transition
            config={{ velocity: 30, friction: 8 }}
            from={{ transform: "scale3d(0.5, 0.5, 0.5)", opacity: 0 }}
            enter={{ transform: "scale3d(1, 1, 1)", opacity: 1 }}
            leave={{ transform: "scale3d(0.5, 0.5, 0.5)" }}
          >
            {styles => (
              <React.Fragment>
                {this.closeMenuOption()}
                {this.workspaceMenuOption()}
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
      </StyleBoundary>
    );
  }
}
