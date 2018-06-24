import React from "react";
import PropTypes from "prop-types";
import Popper from "components/Popper";
import Outline from "./styles/outline";

export default class Callout extends React.Component {
  static propTypes = {
    selector: PropTypes.string.isRequired
  };

  render() {
    const {
      props: { selector }
    } = this;
    return (
      <Popper element={selector}>
        {({ ref, elementWidth, elementHeight }) => (
          <div ref={ref}>
            <Outline
              width={`${elementWidth}px`}
              height={`${elementHeight}px`}
              left={`-${elementWidth / 2 + 8}px`}
              top={`-${elementHeight + 8}px`}
            />
          </div>
        )}
      </Popper>
    );
  }
}
