import types from "./types";

const cancelInspect = () => ({
  type: types.CANCEL_INSPECT
});

const inspect = () => ({
  type: types.INSPECT
});

const showDiff = selector => ({
  type: types.SHOW_DIFF,
  payload: {
    selector
  }
});

const createNewSelector = selector => ({
  type: types.CREATE_NEW_SELECTOR,
  payload: {
    selector
  }
});

export default {
  cancelInspect,
  inspect,
  showDiff,
  createNewSelector
};
