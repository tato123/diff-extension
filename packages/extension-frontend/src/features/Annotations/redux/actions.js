import types from './types';

const addAnnotation = element => ({
  type: types.ADD_ANNOTATION,
  payload: {
    element
  }
});

const addAnnotationSuccess = rule => ({
  type: types.ADD_ANNOTATION_SUCCESS,
  payload: {
    rule
  }
});

const addComment = (comment, selector, attachments) => ({
  type: types.ADD_NEW_COMMENT,
  payload: {
    comment,
    selector,
    attachments
  }
});

const addCommentSuccess = id => ({
  type: types.ADD_NEW_COMMENT_SUCCESS,
  payload: {
    id
  }
});

const addCommentFailed = error => ({
  type: types.ADD_NEW_COMMENT_FAILED,
  payload: {
    error
  }
});

export default {
  addAnnotation,
  addAnnotationSuccess,
  addComment,
  addCommentSuccess,
  addCommentFailed
};
