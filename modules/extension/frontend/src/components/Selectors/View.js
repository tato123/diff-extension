import React from "react";
import PropTypes from "prop-types";
import Callout from "components/Callout";

export default class Selectors extends React.PureComponent {
  static propTypes = {
    selectors: PropTypes.array.isRequired
  };

  render() {
    const {
      props: { selectors }
    } = this;

    return (
      <React.Fragment>
        {selectors.map((selector, idx) => {
          <Callout selector={selector} />;
        })}
      </React.Fragment>
    );
  }
}
