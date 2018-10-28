import React from 'react';
import PropTypes from 'prop-types';
import { Spring, animated } from 'react-spring';
import IntercomHeader from './IntercomHeader';
import ChatList from './ChatList';

/**
 * <IntercomBase />
 */
export default class IntercomBase extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    active: PropTypes.bool
  };

  state = {
    height: 670,
    stable: false
  };

  componentDidMount() {
    const height = window.innerHeight;

    this.setState({
      height: height - height * 0.2
    });
  }

  componentWillUnmount() {
    this.setState({
      stable: false
    });
  }

  _handleRest = () => {
    this.setState({
      stable: true
    });
  };

  render() {
    const { active, messages } = this.props;
    const { stable, height } = this.state;
    const { _handleRest } = this;

    return (
      <Spring
        native
        from={{
          y: 20,
          opacity: 0
        }}
        to={{
          y: active ? 0 : 20,
          opacity: active ? 1 : 0
        }}
        onRest={_handleRest}
      >
        {({ y, opacity }) => (
          <animated.div
            className="intercom-base"
            style={{
              height,
              opacity,
              transform: y.interpolate(yV => `translateY(${yV}px)`)
            }}
          >
            <IntercomHeader active={active} rest={stable} />
            <ChatList messages={messages} />
          </animated.div>
        )}
      </Spring>
    );
  }
}
