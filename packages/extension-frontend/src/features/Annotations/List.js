import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';

class List extends React.Component {
  static propTypes = {
    annotations: PropTypes.array
  };

  render() {
    return <h1>List here</h1>;
  }
}

export default connect()(List);
