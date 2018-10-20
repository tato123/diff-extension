import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const Selector = ({ children, ...rest }) => children(rest);

export default connect(
  (state, props) => createStructuredSelector(props.selectors),
  (dispatch, props) => ({
    ...props.dispatch
  })
)(Selector);
