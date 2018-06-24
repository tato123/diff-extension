import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Popper from "popper.js";

/**
 * Wraps the popper library. This library uses a renderProps approach
 * similar to other libraries, however it also exposes additional data
 * so that we can further customize child element
 */
export default class PopperHandler extends React.PureComponent {
  static propTypes = {
    element: PropTypes.string,
    children: PropTypes.func
  };
  static defaultProps = {
    children: () => {}
  };

  state = {
    popper: null,
    referenceElement: null,
    rootElement: null
  };

  componentDidMount() {
    const rootElement = document.createElement("div");
    const randomId = "popper-" + Math.floor(Math.random() * 100000);
    rootElement.setAttribute("data-portal-id", randomId);
    document.body.appendChild(rootElement);
    this.setState({ rootElement });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.element) {
      const referenceElement = document.querySelector(nextProps.element);
      this.setState({ referenceElement });
    }
  }

  ref = popperElement => {
    const {
      state: { referenceElement }
    } = this;

    if (popperElement && referenceElement) {
      const popper = new Popper(referenceElement, popperElement);
      this.setState({
        popper
      });
    }
  };

  render() {
    const {
      state: { rootElement, referenceElement }
    } = this;

    if (rootElement && referenceElement) {
      const width = window
        .getComputedStyle(referenceElement, null)
        .width.split("px")[0];
      const height = window
        .getComputedStyle(referenceElement, null)
        .height.split("px")[0];

      const Element = this.props.children({
        ref: this.ref,
        elementWidth: parseInt(Math.abs(width)),
        elementHeight: parseInt(Math.abs(height))
      });

      // render in a portal
      return ReactDOM.createPortal(Element, rootElement);
    }
    return null;
  }
}
