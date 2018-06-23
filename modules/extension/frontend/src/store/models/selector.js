import { createSelector } from "reselect";

export default {
  state: {
    byId: {},
    allIds: []
  },
  reducers: {
    addSelector: (state, payload) => {
      const types =
        state.byId[payload.id] && state.byId[payload.id][payload.type]
          ? [...state.byId[payload.id][payload.type], payload.typeId]
          : [payload.typeId];

      return {
        byId: {
          ...state.byId,
          [payload.id]: {
            ...state.byId[payload.id],
            [payload.type]: types
          }
        },
        allIds: [...state.allIds, payload.id]
      };
    }
  },
  selectors: {
    count: createSelector(state => state.allIds, allIds => allIds.length)
  }
};
