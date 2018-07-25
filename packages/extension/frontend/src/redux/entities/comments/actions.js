import types from "./types";

const addComment = payload => ({
  type: types.ADD_COMMENT,
  payload
});

export default {
  addComment
};
