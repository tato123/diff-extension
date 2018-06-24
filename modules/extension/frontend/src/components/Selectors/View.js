import React from "react";
import PropTypes from "prop-types";
import Callout from "components/Callout";

export default class Selectors extends React.Component {
  static propTypes = {
    selectors: PropTypes.array.isRequired
  };

  render() {
    const {
      props: { selectors }
    } = this;

    return (
      <div>
        {selectors.map((selector, idx) => (
          <Callout key={idx} selector={selector} />
        ))}
      </div>
    );
  }
}
