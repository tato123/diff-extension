import React from "react";
import PropTypes from "prop-types";
import ElementHighlight from "./ElementHighlight";
import Viewer from "components/Viewer";
import { Route } from "react-router";

import { inject } from "api/window";
import finder from "@medv/finder";

/* eslint-disable */
export default class Selectors extends React.PureComponent {
  static propTypes = {
    selectors: PropTypes.array.isRequired,
    history: PropTypes.object,
    match: PropTypes.shape({
      url: PropTypes.string
    }),
    location: {
      pathname: PropTypes.string
    },
    createNewSelector: PropTypes.func
  };

  state = {
    elements: []
  };

  componentDidMount() {
    if (this.props.location.pathname === "/selectors") {
      this.getSelector();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === "/selectors") {
      this.getSelector();
    }
  }

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

  getSelector() {
    //   const {
    //     match: { url }
    //   } = this.props;
    //   const selector = await inject();
    //   this.props.history.push(`${url}/${selector}/window`);
    // } catch (err) {
    //   console.error("Get selector isnt working", err);
    // }
    const {
      match: { url }
    } = this.props;

    inject()
      .then(element => {
        const selector = encodeURI(
          element.hasAttribute("data-selector")
            ? element.getAttribute("data-selector")
            : this.createNewSelector(element)
        );

        console.log("using selector", selector);
        const newUrl = `${url}/${selector}/window`;
        console.log("new url", newUrl);
        this.props.history.push(newUrl);
      })
      .catch(err => {
        console.error("element selection error", err.message);
      });
  }

  innerElementReference = e => {
    this.setState(prevState => ({ elements: [...prevState.elements, e] }));
  };

  render() {
    const {
      props: {
        selectors,
        match: { url }
      }
    } = this;

    return (
      <div>
        {selectors.map((selector, idx) => (
          <ElementHighlight key={idx} selector={selector} />
        ))}
        <Route path={`${url}/:id/window`} component={Viewer} />
      </div>
    );
  }
}
