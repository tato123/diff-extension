// @flow

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Popper from "components/Popper";

import { Widget, Outline } from "@diff/shared-components";

type Props = {
  selector: string,
  onClick: () => string
};

type State = {
  domElement: ?HTMLElement
};

const identity = () => {};

export default class Callout extends React.Component<Props, State> {
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

    return (
      <Popper
        element={document.querySelector(selector)}
        render={({ ref, elementWidth, elementHeight }) => (
          <div ref={ref}>
            <Widget innerRef={innerRef}>
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
      state: { domElement }
    } = this;

    if (domElement) {
      // render in a portal
      return ReactDOM.createPortal(this.innerContent(), domElement);
    }
    return null;
  }
}
