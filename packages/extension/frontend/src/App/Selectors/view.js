import React from "react";
import PropTypes from "prop-types";
import ElementHighlight from "./components/ElementHighlight";
import { inspect } from "api/window";
import finder from "@medv/finder";

/* eslint-disable */
export default class Selectors extends React.Component {
  static propTypes = {
    /**
     * All of the avialable CSS selector rules that we want
     * to display
     */
    selectors: PropTypes.array.isRequired,
    /**
     * Opens the diff window for a targeted selector
     */
    showSelectorDetails: PropTypes.func.isRequired,
    /**
     * Toggles our ability to inspect the dom for a
     * new selector
     */
    inspectMode: PropTypes.bool,
    /**
     * Triggers diff to prepare for selection
     */
    inspect: PropTypes.func.isRequired,
    /**
     * Stops our inspection
     */
    cancelInspect: PropTypes.func.isRequired
  };

  static defaultProps = {
    inspectMode: false
  };

  componentDidMount() {
    this.props.inspect();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inspectMode === this.props.inspectMode) {
      return;
    }

    if (nextProps.inspectMode) {
      this.getSelector();
    } else if (this.state.inspect$) {
      this.state.inspect$.stop();
    }
  }

  componentWillUnmount() {
    if (this.state.inspect$) {
      this.state.inspect$.stop();
    }
  }

  /**
   * Using the finder library to build out a new inspector
   *
   * @param {HTMLElement} htmlElement - dom node we want a new css selector for
   * @returns string
   */
  createNewSelector = htmlElement => {
    const newSelector = finder(htmlElement, {
      seedMinLength: 4,
      className: name => {
        if (name.indexOf("df") === -1 && name.indexOf("diff") === -1) {
          return true;
        }
        return false;
      },
      optimizedMinLength: 2,
      threshold: 1000
    });
    return newSelector;
  };

  /**
   * Enables an inspector in the browser that allows a user
   * to target any element on the page
   *
   * @returns {Promise<string>}
   */
  getSelector() {
    const inspect$ = inspect();

    const subscriber = inspect$.subscribe(
      element => {
        if (element) {
          const selector = element.hasAttribute("data-selector")
            ? element.getAttribute("data-selector")
            : this.createNewSelector(element);

          this.props.showSelectorDetails(selector);
        }

        this.props.cancelInspect();
      },
      e => {}
    );

    this.setState({ inspect$, subscriber });
  }

  render() {
    const {
      props: { selectors }
    } = this;
    return (
      <div>
        {selectors.map((selector, idx) => (
          <ElementHighlight key={idx} selector={selector} />
        ))}
      </div>
    );
  }
}
