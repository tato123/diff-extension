import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';
import { Logo } from '@diff/shared-components';
import styled from 'styled-components';
import Icon from './Icon';

const CustomLogo = styled(Logo)`
  width: 24px;
  height: 24px;
`;

const LaunchIcon = ({ active }) => (
  <Spring
    native
    from={{
      o: 1,
      rs: [0, 1]
    }}
    to={{
      o: active ? 0 : 1,
      rs: [active ? 45 : 0, active ? 0 : 1]
    }}
    config={Icon.config}
  >
    {({ o, rs }) => (
      <Icon
        style={{
          opacity: o,
          transform: rs.interpolate(
            (r, s) => `rotate(${r}deg) scale(${s}) translate(-50%, -50%)`
          )
        }}
      >
        <CustomLogo />
      </Icon>
    )}
  </Spring>
);

LaunchIcon.propTypes = {
  active: PropTypes.bool
};

LaunchIcon.defaultProps = {
  active: false
};

export default LaunchIcon;
