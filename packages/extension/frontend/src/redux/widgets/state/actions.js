import types from "./types";

const closeAll = () => ({
  type: types.CLOSE_ALL
});

const show = name => ({
  type: types.SHOW,
  payload: {
    name
  }
});

export default {
  closeAll,
  show
};
