import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Popper from "components/Popper";
import { Outline } from "@diff/shared-components";

export default class ElementHighlight extends React.Component {
  static propTypes = {
    selector: PropTypes.string.isRequired
  };

  state = {
    portalDiv: null
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
      props: { selector }
    } = this;

    if (portalDiv && selector.trim() !== "") {
      // render in a portal
      return ReactDOM.createPortal(
        <Popper
          element={selector}
          render={({ ref, elementWidth, elementHeight }) => (
            <div ref={ref}>
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
