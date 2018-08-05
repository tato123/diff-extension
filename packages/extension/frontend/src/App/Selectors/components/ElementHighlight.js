import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Popper from "components/Popper";
import { Outline, Bubble, StyleBoundary } from "@diff/shared-components";
import styled from "styled-components";

const BubbleStyle = {
  position: "absolute",
  top: "-16px",
  left: "-16px",
  zIndex: "10"
};

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

  > div:first-child {
    padding-left: 16px;
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
`;

export default class ElementHighlight extends React.Component {
  static propTypes = {
    selector: PropTypes.string.isRequired,
    count: PropTypes.number,

    seenCount: PropTypes.number,

    unseenCount: PropTypes.number
  };

  static defaultProps = {
    count: 0,
    seenCount: 0,
    unseenCount: 0
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
      props: { selector, unseenCount, seenCount, count }
    } = this;

    const options = {
      placement: "left-start",
      modifiers: {
        offset: {
          offset: "-16px, -100%r - 16px"
        },
        preventOverflow: {
          enabled: false,
          padding: 0
        }
      }
    };
    if (count === 0) {
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
                <SeenCount>
                  <div>{unseenCount}</div>
                  <UnseenCount>{count}</UnseenCount>
                </SeenCount>
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

//   <Bubble value={count} style={BubbleStyle} />

/* <StyleBoundary shadowDom={false} selectable>
<Outline
  style={{
    transform: `translate(15px, 0px)`,
    position: "absolute"
  }}
  data-selector={selector}
  width={`${elementWidth}px`}
  height={`${elementHeight}px`}
/>
</StyleBoundary> */
