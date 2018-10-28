import React from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import styled from 'styled-components';
import { Label } from '@diff/shared-components';

const BadgeContainer = styled(animated.div)`
  position: absolute;
  top: -50%;
  right: -50%;
  background: #e63a7d;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  color: #fff;
  line-height: 24px;
  transform: translate(-100%, 100%);
  will-change: transform;
`;

const Badge = ({ active, count, stable }) => {
  const classes = `${active ? '-df-badge--active' : ''}`;

  return (
    <Spring
      native
      from={{
        opacity: 0,
        scale: 0
      }}
      to={{
        opacity: !active && stable ? 1 : 0,
        scale: !active && stable ? 1 : 0
      }}
      config={{ duration: 150 }}
    >
      {({ opacity, scale }) => (
        <BadgeContainer
          className={classes}
          style={{
            opacity,
            transform: scale.interpolate(
              sX => `translate(-100%, 100%) scale(${sX})`
            )
          }}
        >
          <Label as="button">{count || 0}</Label>
        </BadgeContainer>
      )}
    </Spring>
  );
};

Badge.propTypes = {
  active: PropTypes.bool,
  count: PropTypes.number,
  stable: PropTypes.bool
};

export default Badge;
