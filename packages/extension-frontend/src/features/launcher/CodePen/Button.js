import React from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import _ from 'lodash-es';
import styled from 'styled-components';
import Badge from './Badge';
import LaunchIcon from './LaunchIcon';
import CloseIcon from './CloseIcon';

const AnimatedButton = styled(animated.button)`
  outline: 0;
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: block;
  background: #171a3a;
  width: 60px;
  height: 60px;
  border: 0;
  border-radius: 100%;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 32px rgba(0, 0, 0, 0.16);
  transition: box-shadow 200ms ease;
  cursor: pointer;
  will-change: transform, opacity;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09), 0 4px 40px rgba(0, 0, 0, 0.24);
  }
`;

export default class Button extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    count: PropTypes.number,
    onClick: PropTypes.func
  };

  static defaultProps = {
    active: false,
    className: '',
    count: 0,
    onClick: _.noop
  };

  state = {
    stable: false
  };

  handleRest = () => {
    this.setState({
      stable: true
    });
  };

  render() {
    const { active, className, count, onClick } = this.props;

    const { stable } = this.state;

    const classes = `intercom-button ${
      active ? 'intercom-button--active' : ''
    } ${className}`;

    return (
      <Spring
        native
        from={{
          opacity: 0,
          scale: 0
        }}
        to={{
          opacity: 1,
          scale: 1
        }}
        onRest={this.handleRest}
      >
        {({ opacity, scale }) => (
          <AnimatedButton
            className={classes}
            onClick={onClick || _.noop}
            style={{
              opacity,
              transform: scale.interpolate(sX => `scale(${sX})`)
            }}
          >
            <Badge active={active} count={count} stable={stable} />
            <LaunchIcon active={active} />
            <CloseIcon active={active} />
          </AnimatedButton>
        )}
      </Spring>
    );
  }
}
