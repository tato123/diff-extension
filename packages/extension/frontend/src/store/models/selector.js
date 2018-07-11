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
        allIds: _.union(state.allIds, [payload.id])
      };
    }
  },
  selectors: {
    count: createSelector(state => state.allIds, allIds => allIds.length || 0),
    ids: createSelector(state => state.allIds, allIds => allIds || [])
  },
  effects: dispatch => ({
    createNewSelector(htmlElement) {
      const newSelector = finder(htmlElement, {
        seedMinLength: 4,
        className: name => {
          if (name.indexOf("df") === -1 && name.indexOf("diff") === -1) {
            return true;
          }
          return false;
        },
        optimizedMinLength: 2,
        threshold: 1000
      });
      return newSelector;
    }
  })
};
