import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../entities/session';

class UserSession extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  };

  componentDidMount() {
    const {
      props: { dispatch }
    } = this;

    dispatch(actions.getFirebaseToken());
  }

  render() {
    const {
      props: { children }
    } = this;

    return <div>{children}</div>;
  }
}

export default connect(null)(UserSession);
