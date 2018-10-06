import React from 'react';
import PropTypes from 'prop-types';

export default class UserSession extends React.PureComponent {
  static propTypes = {
    getFirebaseToken: PropTypes.func,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    getFirebaseToken: () => {}
  };

  componentDidMount() {
    const {
      props: { getFirebaseToken }
    } = this;
    getFirebaseToken();
  }

  render() {
    const {
      props: { children }
    } = this;

    return <div>{children}</div>;
  }
}
