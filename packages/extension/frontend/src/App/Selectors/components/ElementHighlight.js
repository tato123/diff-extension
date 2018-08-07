import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Popper from "components/Popper";
import { StyleBoundary } from "@diff/shared-components";
import styled from "styled-components";
import { Spring } from "react-spring";

const SeenCount = styled.div`
  height: 32px;
  width: 64px;
  border-radius: 16px;
  background: #181a3a;
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding-right: 4px;
  position: absolute;
  z-index: 9999999;
  overflow: hidden;

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const UnseenCount = styled.div`
  height: 26px;
  width: 26px;
  min-height: 26px;
  min-width: 26px;
  border-radius: 50%;
  background: #e5397a;
  color: #fff;
  font-weight: 500;
  display: flex;
  align-items: center;

  justify-content: center;
  opacity: 0;
  transform: translateX(-32px);
`;

export default class ElementHighlight extends React.Component {
  static propTypes = {
    selector: PropTypes.string.isRequired,

    seenCount: PropTypes.number,

    unseenCount: PropTypes.number,
    styles: PropTypes.object,
    hovered: PropTypes.bool,
    selected: PropTypes.bool
  };

  static defaultProps = {
    seenCount: 0,
    unseenCount: 0,
    hovered: false
  };

  state = {
    portalDiv: null
  };

  componentDidMount() {
    const portalDiv = document.createElement("div");
    portalDiv.id = "popper-" + Math.floor(Math.random() * 100000);
    portalDiv.style.position = "absolute";
    portalDiv.style.top = 0;
    portalDiv.style.left = 0;
    document.body.appendChild(portalDiv);
    this.setState({ portalDiv });
  }

  componentWillUnmount() {
    if (this.state.portalDiv != null) {
      this.state.portalDiv.remove();
    }
  }

  render() {
    const {
      state: { portalDiv },
      props: { selector, unseenCount, seenCount, hovered, selected }
    } = this;

    const options = {
      placement: "left-start",
      modifiers: {
        offset: {
          offset: "-16px, -100%r - 16px"
        }
      }
    };
    if (seenCount === 0 && unseenCount === 0) {
      return null;
    }

    if (portalDiv && selector.trim() !== "") {
      // render in a portal
      return ReactDOM.createPortal(
        <Popper
          options={options}
          element={selector}
          render={({ ref, elementWidth, elementHeight }) => (
            <div ref={ref}>
              <StyleBoundary>
                <Spring
                  config={{ velocity: 30 }}
                  from={{
                    width: "32px",
                    paddingLeft: "12px",
                    transform: "scale3d(1,1,1)"
                  }}
                  to={{
                    width: unseenCount === 0 ? "32px" : "64px",
                    paddingLeft: unseenCount === 0 ? "12px" : "16px",
                    transform:
                      hovered && !selected
                        ? "scale3d(1.2,1.2,1)"
                        : "scale3d(1,1,1)"
                  }}
                >
                  {styles => (
                    <SeenCount style={{ ...this.props.styles, ...styles }}>
                      <div>{seenCount}</div>
                      <Spring
                        from={{ transform: "translateX(-32px)", opacity: 0 }}
                        to={{
                          opacity: unseenCount > 0 ? 1 : 0,
                          transform:
                            unseenCount > 0
                              ? "translateX(0px)"
                              : "translateX(-32px)"
                        }}
                      >
                        {styles => (
                          <UnseenCount style={styles}>
                            {unseenCount}
                          </UnseenCount>
                        )}
                      </Spring>
                    </SeenCount>
                  )}
                </Spring>
              </StyleBoundary>
            </div>
          )}
        />,
        portalDiv
      );
    }
    return null;
  }
}
