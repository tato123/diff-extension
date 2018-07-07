import { createSelector } from "reselect";
import _ from "lodash";
import finder from "@medv/finder";

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
        allIds: _.uniq([...state.allIds, payload.id])
      };
    }
  },
  selectors: {
    count: createSelector(state => state.allIds, allIds => allIds.length),
    ids: createSelector(state => state.allIds, allIds => allIds || [])
  },
  effects: dispatch => ({
    createNewSelector(htmlElement) {
      const newSelector = finder(htmlElement, {
        seedMinLength: 4,
        optimizedMinLength: 2,
        threshold: 1000
      });
      return newSelector;
    }
  })
};
