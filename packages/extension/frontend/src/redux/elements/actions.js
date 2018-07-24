import types from "./types";

const addSelector = payload => ({
  type: types.ADD_SELECTOR,
  payload
});

const cancelInspect = () => ({
  type: types.CANCEL_INSPECT
});

const inspect = () => ({
  type: types.INSPECT
});

export default {
  addSelector,
  cancelInspect,
  inspect
};
