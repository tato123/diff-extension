import types from "./types";

const closeAll = () => ({
  type: types.CLOSE_ALL
});

const show = widget => ({
  type: types.SHOW,
  payload: {
    widget
  }
});

export default {
  closeAll,
  show
};
