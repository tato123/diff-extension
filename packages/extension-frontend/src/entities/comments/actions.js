import types from './types';

const addComment = payload => ({
  type: types.ADD_COMMENT,
  payload
});

const clearComments = () => ({
  type: types.CLEAR_COMMENTS
});

const fetchCommentsFailed = error => ({
  type: types.FETCH_COMMENTS_ERROR,
  payload: {
    error
  }
});

export default {
  addComment,
  clearComments,
  fetchCommentsFailed
};
