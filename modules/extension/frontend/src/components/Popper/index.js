// @flow
import React from "react";
import PropTypes from "prop-types";
import Popper from "popper.js";

/**
 * Wraps the popper library. This library uses a renderProps approach
 * similar to other libraries, however it also exposes additional data
 * so that we can further customize child element
 */
export default class PopperHandler extends React.Component {
  static propTypes = {
    element: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
    options: PropTypes.object
  };

  static defaultProps = {
    options: {
      placement: "left-start"
    }
  };

  state = {
    popper: null,
    rootElement: null
  };

  ref = popperElement => {
    const {
      props: { element, options }
    } = this;

    if (!popperElement) {
      console.error("No popper element defined");
      return;
    }

    try {
      const popper = new Popper(element, popperElement, options);
      this.setState({
        popper
      });
    } catch (err) {
      debugger;
      console.log("whats going on ", err);
    }
  };

  getPopperTargetElementStyles(element) {
    // Calculate the targets
    const width = window.getComputedStyle(element, null).width.split("px")[0];
    const height = window.getComputedStyle(element, null).height.split("px")[0];
    return {
      elementWidth: parseInt(Math.abs(width)),
      elementHeight: parseInt(Math.abs(height))
    };
  }

  render() {
    const {
      props: { render, element }
    } = this;

    return render({
      ref: this.ref,
      ...this.getPopperTargetElementStyles(element)
    });
  }
}
