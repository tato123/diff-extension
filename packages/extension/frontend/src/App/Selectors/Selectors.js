import React from "react";
import PropTypes from "prop-types";
import ElementHighlight from "./components/ElementHighlight";
import VisibleElements from "components/VisibleElements";
import styled from "styled-components";
import { Spring } from "react-spring";
import { StyleBoundary } from "@diff/shared-components";

const StickyHeader = styled.div`
  position: fixed;
  top: 0px;
  width: 162px;
  height: 30px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #fff;
  background-color: #191b3b;
  margin: 0 auto;
  left: calc(50% - 81px);
  text-align: center;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999999999999;
  transform: translate(0px, -165px, 0px);
  will-change: transform;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.2);
`;

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
    cancelInspect: PropTypes.func.isRequired,
    /**
     * Create selector
     */
    createNewSelector: PropTypes.func.isRequired,
    /**
     * Whether elements should display a counter of the diffs
     */
    showCount: PropTypes.bool,
    /**
     * All of the selectors that a user has viewed
     */
    getSeenCount: PropTypes.func.isRequired,
    /**
     * All of the selectors that a user has NOT viewed
     */
    getUnseenCount: PropTypes.func.isRequired,
    /**
     * Returns a CSS selector for an element
     */
    selectorForElement: PropTypes.func.isRequired,
    /**
     * function to start inspecting the DOM
     */
    domInspect: PropTypes.func.isRequired,
    /**
     * Diff was opened somewhere for a particular selector
     */
    diffOpenForSelector: PropTypes.string
  };

  static defaultProps = {
    inspectMode: false,
    showCount: false,
    diffOpenForSelector: null
  };

  componentDidMount() {
    this.getSelector();
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
    if (this.state) {
      this.state.inspect$.unsubscribe();
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
    const newSelector = this.props.selectorForElement(htmlElement, {
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

    this.props.createNewSelector(newSelector);
    return newSelector;
  };

  getSelectorForElement = element => {
    const indexForSelector = _.findIndex(this.props.selectors, cssRule => {
      const searchedElement = document.querySelector(cssRule);
      return searchedElement === null
        ? false
        : element.isSameNode(searchedElement);
    });

    return indexForSelector !== -1
      ? this.props.selectors[indexForSelector]
      : this.createNewSelector(element);
  };

  /**
   * Enables an inspector in the browser that allows a user
   * to target any element on the page
   *
   * @returns {Promise<string>}
   */
  getSelector() {
    const inspect$ = this.props.domInspect();

    const subscriber = inspect$.subscribe(
      element => {
        if (element) {
          const selector = this.getSelectorForElement(element);
          this.props.showSelectorDetails(selector);
        }

        subscriber.unsubscribe();

        this.props.cancelInspect();
      },
      e => {
        console.error("Error selecting", e);
      }
    );

    this.setState({ inspect$, subscriber });
  }

  render() {
    const {
      props: { selectors, getSeenCount, getUnseenCount, diffOpenForSelector }
    } = this;

    return (
      <VisibleElements selectors={selectors}>
        {visibility => {
          const val = visibility.reduce((acc, x) => {
            return !x.visible ? ++acc : acc;
          }, 0);
          return (
            <div>
              <StyleBoundary>
                <StickyHeader
                  style={{
                    transform:
                      val > 0
                        ? "translate3d(0, 0px, 0)"
                        : "translate3d(0, -165px, 0)"
                  }}
                >
                  Elements not shown {val}
                </StickyHeader>
              </StyleBoundary>

              {visibility.map(({ selector, visible }, idx) => (
                <Spring
                  key={idx}
                  from={{ opacity: 1 }}
                  to={{
                    opacity:
                      diffOpenForSelector === null
                        ? 1
                        : diffOpenForSelector === selector
                          ? 1
                          : 0
                  }}
                >
                  {styles => (
                    <ElementHighlight
                      styles={styles}
                      selector={selector}
                      seenCount={getSeenCount(selector)}
                      unseenCount={getUnseenCount(selector)}
                    />
                  )}
                </Spring>
              ))}
            </div>
          );
        }}
      </VisibleElements>
    );
  }
}
