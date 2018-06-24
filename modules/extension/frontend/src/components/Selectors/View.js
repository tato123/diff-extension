// @flow

import React from "react";
import PropTypes from "prop-types";
import Callout from "components/Callout";
import Viewer from "components/Viewer";
import { Route } from "react-router";

export default class Selectors extends React.Component {
  static propTypes = {
    selectors: PropTypes.array.isRequired,
    history: PropTypes.object
  };

  onSelectorClicked = (selector: string) => () => {
    this.props.history.push(`/selectors/${selector}`);
  };

  render() {
    const {
      props: { selectors }
    } = this;

    return (
      <div>
        {selectors.map((selector, idx) => (
          <Callout
            key={idx}
            selector={selector}
            onClick={this.onSelectorClicked(selector)}
          />
        ))}
        <Route path="/selectors/:id" component={Viewer} />
      </div>
    );
  }
}
