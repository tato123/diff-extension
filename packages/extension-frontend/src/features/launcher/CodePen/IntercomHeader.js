import React from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';

/**
 * <IntercomHeader />
 */
const IntercomHeader = ({ active, rest }) => (
  <Spring
    native
    from={{
      y: 60
    }}
    to={{
      y: active && rest ? 60 : 60
    }}
  >
    {({ y }) => (
      <animated.header
        className="intercom-header"
        style={{
          height: y.interpolate(yD => `${yD}px`)
        }}
      />
    )}
  </Spring>
);

IntercomHeader.propTypes = {
  active: PropTypes.bool,
  rest: PropTypes.bool
};

IntercomHeader.defaultProps = {
  active: false,
  rest: false
};

export default IntercomHeader;
