import { combineReducers } from "redux";
import types from "./types";

const initialState = {
  byId: {},
  allIds: []
};

const diff = (state = initialState, { payload, type }) => {
  switch (type) {
    case types.ADD_DIFF:
      return {
        byId: {
          ...state.byId,
          [payload.id]: payload
        },
        allIds: _.union(state.allIds, [payload.id])
      };
    default:
      return state;
  }
};

const comments = (state = initialState, { payload, type }) => {
  switch (type) {
    case types.ADD_COMMENT:
      return {
        byId: {
          ...state.byId,
          [payload.id]: payload
        },
        allIds: _.union(state.allIds, [payload.id])
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  diff,
  comments
});

export default reducer;
