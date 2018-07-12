import React from "react";
import PropTypes from "prop-types";
import ElementHighlight from "./ElementHighlight";
import { inject } from "api/window";
import finder from "@medv/finder";

/* eslint-disable */
export default class Selectors extends React.Component {
  static propTypes = {
    selectors: PropTypes.array.isRequired,
    toggleDiffForSelector: PropTypes.func.isRequired
  };

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

  componentDidMount() {
    this.getSelector();
  }

  getSelector() {
    inject()
      .then(element => {
        const selector = element.hasAttribute("data-selector")
          ? element.getAttribute("data-selector")
          : this.createNewSelector(element);

        this.props.toggleDiffForSelector({ selector });
      })
      .catch(err => {
        console.error("element selection error", err.message);
      });
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
