import React from 'react';
import PropTypes from 'prop-types';
import TextCell from './TextComment.cell';

const CommentList = ({ comments }) => (
  <div>
    {comments.map(comment => {
      if (comment.type === 'comment') {
        return <TextCell item={comment} />;
      }
      return null;
    })}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array
};

CommentList.defaultProps = {
  comments: []
};

export default CommentList;
