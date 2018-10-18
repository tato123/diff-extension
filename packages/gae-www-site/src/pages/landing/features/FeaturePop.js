import React from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { Spring, animated } from 'react-spring';

export default class FeaturePop extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  static defaultProps = {
    children: () => {}
  };

  state = {
    fade: true
  };

  setFade = val => () => {
    this.setState({ fade: val });
  };

  render() {
    const {
      state: { fade },
      props: { children }
    } = this;

    if (typeof children !== 'function') {
      return null;
    }

    return (
      <Waypoint onEnter={this.setFade(true)} onLeave={this.setFade(false)}>
        {children(fade)}
      </Waypoint>
    );
  }
}

FeaturePop.Pop = ({ children, fade }) => (
  <Spring
    config={{ delay: 10 }}
    native
    to={{
      opacity: fade ? 1 : 0.2,
      transform: `translateY(${fade ? '0px' : '50px'}) scale(${
        fade ? '1' : '0.5'
      })`
    }}
  >
    {styles => <animated.div style={styles}>{children}</animated.div>}
  </Spring>
);

FeaturePop.Pop.propTypes = {
  children: PropTypes.node.isRequired,
  fade: PropTypes.bool.isRequired
};
