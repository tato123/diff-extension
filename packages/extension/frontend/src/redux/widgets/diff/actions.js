import types from "./types";

const updateItemsSeen = arrayOfIds => ({
  type: types.UPDATE_ITEMS_SEEN,
  payload: {
    ids: arrayOfIds
  }
});

const updateItemsSeenSuccess = arrayOfIds => ({
  type: types.WRITE_UPDATE_ITEMS_SEEN_SUCCESS,
  payload: {
    ids: arrayOfIds
  }
});

const updateItemsSeenFailed = (err, arrayOfIds) => ({
  type: types.WRITE_UPDATE_ITEMS_SEEN_SUCCESS,
  payload: {
    ids: arrayOfIds,
    err
  }
});

const closeDiff = selectorId => ({
  type: types.CLOSE_DIFF,
  payload: {
    selectorId
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

const addCommentFailed = err => ({
  type: types.ADD_NEW_COMMENT_FAILED,
  payload: {
    err
  }
});

export default {
  updateItemsSeen,
  updateItemsSeenSuccess,
  updateItemsSeenFailed,
  closeDiff,

  addComment,
  addCommentSuccess,
  addCommentFailed
};
