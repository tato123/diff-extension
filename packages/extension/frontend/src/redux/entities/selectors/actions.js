import types from "./types";

const addSelector = payload => ({
  type: types.ADD_SELECTOR,
  payload
});

const addNewSelector = cssSelector => ({
  type: types.ADD_NEW_SELECTOR,
  payload: {
    id: cssSelector
  }
});

export default {
  addSelector,
  addNewSelector
};
