import types from "./types";

const initialState = {
  inspectMode: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.INSPECT:
      return {
        ...state,
        inspectMode: true
      };
    case types.CANCEL_INSPECT:
      return {
        ...state,
        inspectMode: false
      };
    default:
      return state;
  }
};

export default reducer;
