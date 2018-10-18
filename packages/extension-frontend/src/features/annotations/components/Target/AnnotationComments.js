import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors } from '../../redux';

const Annotation = ({ children, comments }) => children({ comments });

const withComment = connect((state, props) => {
  const comments = selectors.makeAllCommentsSelector(props.annotation);
  return createStructuredSelector({
    comments
  });
});

export default withComment(Annotation);
