import types from "./types";
import _ from "lodash";

const initialState = {
  byId: {},
  allIds: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_WORKSPACE_BY_ID_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.data.id]: action.payload.data
        },
        allIds: _.uniq([...state.allIds, action.payload.data.id])
      };
    default:
      return state;
  }
};

export default reducer;
