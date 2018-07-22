import _ from "lodash";
import types from "./types";

const initialState = {
  byId: {},
  allIds: [],
  inspectMode: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_SELECTOR:
      const selectorType =
        state.byId[payload.id] && state.byId[payload.id][payload.type]
          ? [...state.byId[payload.id][payload.type], payload.typeId]
          : [payload.typeId];

      return {
        byId: {
          ...state.byId,
          [payload.id]: {
            ...state.byId[payload.id],
            [payload.type]: selectorType
          }
        },
        allIds: _.union(state.allIds, [payload.id])
      };
    case types.CANCEL_INSPECT:
      return {
        ...state,
        inspectMode: false
      };
    case types.INSPECT:
      return {
        ...state,
        inspectMode: true
      };
    default:
      return state;
  }
};

export default reducer;
