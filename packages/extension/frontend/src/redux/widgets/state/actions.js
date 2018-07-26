import types from "./types";

const show = (name, context = {}) => ({
  type: types.SHOW,
  payload: {
    name,
    context
  }
});

const hide = name => ({
  type: types.HIDE,
  payload: {
    name
  }
});

export default {
  show,
  hide
};
