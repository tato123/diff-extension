import types from "./types";

const addSelector = payload => ({
  type: types.ADD_SELECTOR,
  payload
});

export default {
  addSelector
};
