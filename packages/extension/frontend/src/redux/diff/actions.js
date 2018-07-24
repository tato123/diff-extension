import types from "./types";

const addDiff = payload => ({
  type: types.ADD_DIFF,
  payload
});

const addComment = payload => ({
  type: types.ADD_COMMENT,
  payload
});

export default {
  addDiff,
  addComment
};
