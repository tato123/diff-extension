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
    /**
     * The HTMLElement that we want to select
     */
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired,
    /**
     * Render function that will be called
     * as part of our render props
     */
    render: PropTypes.func.isRequired,
    /**
     * Any additional popper options that we want to pass in
     */
    options: PropTypes.object
  };

  static defaultProps = {
    options: {
      placement: "left-start",
      modifiers: {
        preventOverflow: { enabled: true }
      }
    }
  };

  state = {
    popper: null
  };

  ref = popperElement => {
    const {
      props: { element, options }
    } = this;

    if (!popperElement) {
      // console.error("No popper element defined");
      return;
    }

    const targetedElement =
      typeof element === "string" ? document.querySelector(element) : element;

    if (process.env.NODE_ENV === "development") {
      console.group("Popper");
      console.log("Popper Element", popperElement);
      console.log("Selector", element);
      console.groupEnd("Popper");
    }

    // element is still available on the page
    if (targetedElement != null) {
      const popper = new Popper(
        targetedElement || document.body,
        popperElement,
        options
      );
      this.setState({
        popper
      });
    } else {
      console.error(
        `The CSS Selector [${JSON.stringify(
          element
        )}] is not valid for this page.`
      );
    }
  };

  componentDidCatch(err) {
    console.error("error occured", err);
  }

  componentWillUnmount() {
    const { popper } = this.state;
    if (popper) {
      popper.destroy();
    }
  }

  getPopperTargetElementStyles(element) {
    const targetedElement =
      typeof element === "string" ? document.querySelector(element) : element;

    // component may have been unmounted
    // unexpectedly
    if (targetedElement == null) {
      return {
        elementWidth: 0,
        elementHeight: 0
      };
    }

    // Calculate the targets
    const width = window
      .getComputedStyle(targetedElement, null)
      .width.split("px")[0];
    const height = window
      .getComputedStyle(targetedElement, null)
      .height.split("px")[0];
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
