import React from 'react';
import PropTypes from 'prop-types';

const FeatureFlag = ({ flag, value, enabled, disabled }) => {
  if (flag === value) {
    return enabled();
  }

  return disabled();
};

FeatureFlag.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  enabled: PropTypes.func,
  disabled: PropTypes.func
};

export default FeatureFlag;
