import { createSelector } from "reselect";
import _ from "lodash";

export default {
  state: {
    byId: {},
    allIds: [],
    inspectMode: false
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
    },
    inspect: (state, payload) => ({
      ...state,
      inspectMode: true
    }),
    cancelInspect: (state, payload) => ({
      ...state,
      inspectMode: false
    })
  },
  selectors: {
    count: createSelector(state => state.allIds, allIds => allIds.length || 0),
    ids: createSelector(state => state.allIds, allIds => allIds || [])
  },
  effects: dispatch => ({
    toggleDiffForSelector(payload, rootState) {
      dispatch.widgets.show({
        name: "diff",
        context: {
          selector: payload.selector
        }
      });
    }
  })
};
