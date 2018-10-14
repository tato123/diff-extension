import React from 'react';
import PropTypes from 'prop-types';

const CommentList = ({ comments }) => (
  <div>
    {comments.map((comment, id) => (
      <div key={id}>comment placeholder</div>
    ))}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array
};

CommentList.defaultProps = {
  comments: []
};

export default CommentList;
