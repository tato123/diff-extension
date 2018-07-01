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

export default class Callout extends React.Component<Props, State> {
  static propTypes = {
    selector: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {}
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
            <Widget>
              <Outline
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
