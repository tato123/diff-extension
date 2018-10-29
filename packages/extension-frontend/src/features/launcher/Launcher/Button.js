import React from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import _ from 'lodash-es';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { ic_close as closeIcon } from 'react-icons-kit/md/ic_close';
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
  border-radius: 60px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 32px rgba(0, 0, 0, 0.16);
  transition: box-shadow 200ms ease;
  cursor: pointer;
  will-change: transform, opacity;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09), 0 4px 40px rgba(0, 0, 0, 0.24);
  }
`;

const ButtonText = styled.span`
  color: #fff;
  font-size: 14px;
`;

export default class Button extends React.Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    count: PropTypes.number,
    onClick: PropTypes.func
  };

  static defaultProps = {
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
    const { mode, count, onClick } = this.props;

    const { stable } = this.state;

    const classes = `${mode ? `df-button--active-${mode}` : ''}`;

    const normal = mode === 'controlpanel' || mode === 'initial';

    return (
      <Spring
        native
        from={{
          opacity: 0,
          scale: 0,
          width: 60
        }}
        to={{
          opacity: 1,
          scale: 1,
          width: mode === 'inspecting' ? 120 : 60
        }}
        config={{ tension: 1000, friction: 50 }}
        onRest={this.handleRest}
      >
        {({ opacity, scale, width }) => (
          <AnimatedButton
            className={classes}
            onClick={onClick || _.noop}
            style={{
              opacity,
              transform: scale.interpolate(sX => `scale(${sX})`),
              width
            }}
          >
            {normal && (
              <React.Fragment>
                <Badge
                  active={mode === 'controlpanel'}
                  count={count}
                  stable={stable}
                />
                <LaunchIcon active={mode === 'controlpanel'} />
                <CloseIcon active={mode === 'controlpanel'} />
              </React.Fragment>
            )}
            {!normal && (
              <ButtonText>
                <Icon size={18} icon={closeIcon} />
                <span> Inspecting</span>
              </ButtonText>
            )}
          </AnimatedButton>
        )}
      </Spring>
    );
  }
}
