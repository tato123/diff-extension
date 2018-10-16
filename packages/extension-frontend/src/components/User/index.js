import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';

const User = ({ children, user }) => children(user);

const user = createSelector(
  (state, props) => state.entities.users.byId[props.id],
  innerUser => innerUser
);

export default connect(
  createStructuredSelector({
    user
  })
)(User);
