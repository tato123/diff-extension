import types from "./types";

const cancelInspect = () => ({
  type: types.CANCEL_INSPECT
});

const inspect = () => ({
  type: types.INSPECT
});

export default {
  cancelInspect,
  inspect
};
