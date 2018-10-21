import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextCell from './TextComment.cell';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  height: inherit;
  overflow: auto;

  div {
    border-bottom: var(--df-border);
  }

  div:last-child {
    border-bottom: none;
  }
`;

const CommentList = ({ comments }) => (
  <Container>
    {comments.map(comment => {
      if (comment.type === 'comment') {
        return <TextCell item={comment} key={comment.id} />;
      }
      return null;
    })}
  </Container>
);

CommentList.propTypes = {
  comments: PropTypes.array
};

CommentList.defaultProps = {
  comments: []
};

export default CommentList;
