import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Popper from "components/Popper";
import Outline from "./styles/outline";

export default class Callout extends React.Component {
  static propTypes = {
    selector: PropTypes.string.isRequired
  };

  state = {
    domElement: null
  };

  componentDidMount() {
    const rootElement = document.createElement("div");
    const randomId = "popper-" + Math.floor(Math.random() * 100000);
    rootElement.setAttribute("data-portal-id", randomId);
    document.body.appendChild(rootElement);
    this.setState({ domElement: rootElement });
  }

  innerContent = () => {
    const {
      props: { selector }
    } = this;

    return (
      <Popper
        element={document.querySelector(selector)}
        render={({ ref, elementWidth, elementHeight }) => (
          <div ref={ref}>
            <div>
              <Outline
                width={`${elementWidth}px`}
                height={`${elementHeight}px`}
                left={"-8px"}
                top={"-8px"}
              />
            </div>
          </div>
        )}
      />
    );
  };

  render() {
    const {
      state: { domElement }
    } = this;

    if (domElement) {
      // render in a portal
      return ReactDOM.createPortal(this.innerContent(), domElement);
    }
    return null;
  }
}
