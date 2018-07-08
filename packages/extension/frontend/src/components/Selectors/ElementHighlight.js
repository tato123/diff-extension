import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Popper from "components/Popper";

import { Widget, Outline } from "@diff/shared-components";

const identity = () => {};

export default class Callout extends React.Component {
  static propTypes = {
    selector: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    innerRef: PropTypes.func,
    highlight: PropTypes.bool
  };

  static defaultProps = {
    onClick: identity,
    innerRef: identity,
    highlight: false
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
      props: { selector, innerRef, highlight }
    } = this;

    const domElement = document.querySelector(selector);

    if (!domElement) {
      console.warn("Unable to resolve element", selector);
      return null;
    }

    return (
      <Popper
        element={domElement}
        render={({ ref, elementWidth, elementHeight }) => (
          <div ref={ref}>
            <Widget innerRef={innerRef} selectable={true}>
              <Outline
                highlight={highlight}
                onClick={this.props.onClick}
                width={`${elementWidth}px`}
                height={`${elementHeight}px`}
              />
            </Widget>
          </div>
        )}
      />
    );
  };

  render() {
    const {
      state: { domElement },
      props: { selector }
    } = this;

    if (domElement && selector) {
      // render in a portal
      return ReactDOM.createPortal(this.innerContent(), domElement);
    }
    return null;
  }
}
