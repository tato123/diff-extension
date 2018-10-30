import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';
import { Icon } from 'react-icons-kit';

import { ic_close as closeIcon } from 'react-icons-kit/md/ic_close';
import styled from 'styled-components';
import IconContainer from './Icon';

const StyledClose = styled(Icon)`
  color: #fff;
  width: 24px;
  height: 24px;
`;

const CloseIcon = ({ active }) => (
  <Spring
    native
    from={{
      opacity: 0,
      rs: [-45, 0]
    }}
    to={{
      opacity: active ? 1 : 0,
      rs: [active ? 0 : -45, active ? 1 : 0]
    }}
    config={Icon.config}
  >
    {({ opacity, rs }) => (
      <IconContainer
        style={{
          opacity,
          transform: rs.interpolate(
            (r, s) => `rotate(${r}deg) scale(${s}) translate(-50%, -50%)`
          )
        }}
      >
        <StyledClose size={23} icon={closeIcon} />
      </IconContainer>
    )}
  </Spring>
);

CloseIcon.propTypes = {
  active: PropTypes.bool
};

CloseIcon.defaultProps = {
  active: false
};

export default CloseIcon;
