import types from "./types";

const initialState = [
  {
    name: "launcher",
    static: true
  }
];
const reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case types.SHOW:
      return [...state, payload];
    case types.HIDE:
      return state.filter(x => x.name !== payload.name);
    default:
      return state;
  }
};

export default reducer;
