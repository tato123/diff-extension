import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Popper from "components/Popper";
import { Outline, Bubble } from "@diff/shared-components";

const BubbleStyle = {
  position: "absolute",
  top: "-16px",
  left: "-16px",
  zIndex: "10"
};

export default class ElementHighlight extends React.Component {
  static propTypes = {
    selector: PropTypes.string.isRequired,
    count: PropTypes.number
  };

  state = {
    portalDiv: null,
    count: 0
  };

  componentDidMount() {
    const portalDiv = document.createElement("div");
    portalDiv.id = "popper-" + Math.floor(Math.random() * 100000);
    document.body.appendChild(portalDiv);
    setTimeout(() => {
      this.setState({ portalDiv });
    }, 10);
  }

  componentWillUnmount() {
    this.state.portalDiv.remove();
  }

  render() {
    const {
      state: { portalDiv },
      props: { selector, count }
    } = this;

    if (portalDiv && selector.trim() !== "") {
      // render in a portal
      return ReactDOM.createPortal(
        <Popper
          element={selector}
          render={({ ref, elementWidth, elementHeight }) => (
            <div ref={ref}>
              <Bubble value={count} style={BubbleStyle} />
              <Outline
                data-selector={selector}
                left={"-2px"}
                top={"-4px"}
                width={`${elementWidth}px`}
                height={`${elementHeight}px`}
              />
            </div>
          )}
        />,
        portalDiv
      );
    }
    return null;
  }
}
