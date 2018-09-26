import types from "./types";

const addComment = payload => ({
  type: types.ADD_COMMENT,
  payload
});

const clearComments = payload => ({
  type: types.CLEAR_COMMENTS
});

export default {
  addComment,
  clearComments
};
