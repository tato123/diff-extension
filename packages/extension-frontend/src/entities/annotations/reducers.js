import _ from 'lodash-es';
import types from './types';

const initialState = {
  byId: {},
  allIds: []
};

const addExistingSelector = (state, { type, payload }) => {
  // Checks if there is already an entry for the type, e.g. for a diff
  // if this selector has a record just add this entity types id to it
  // otherwise create a new id
  const newOrExistingTypeForSelector =
    state.byId[payload.id] && state.byId[payload.id][payload.type]
      ? _.union([...state.byId[payload.id][payload.type]], [payload.typeId])
      : [payload.typeId];

  // remove transient flag if this was previously created in the UI
  // and this is our first actual record for it (should be persisted now)
  if (_.has(state.byId[payload.id], 'transient')) {
    delete state.byId[payload.id].transient;
  }

  return {
    byId: {
      ...state.byId,
      [payload.id]: {
        ...state.byId[payload.id],
        [payload.type]: newOrExistingTypeForSelector
      }
    },
    allIds: _.union(state.allIds, [payload.id])
  };
};

const addNewSelector = (state, { type, payload }) => ({
  byId: {
    ...state.byId,
    [payload.id]: {
      transient: true
    }
  },
  allIds: _.union(state.allIds, [payload.id])
});

const deleteSelector = (state, { type, payload }) => ({
  byId: _.omit(state.byId, payload.selectorId),
  allIds: _.without(state.allIds, payload.selectorId)
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_SELECTOR:
      return addExistingSelector(state, action);
    case types.ADD_NEW_SELECTOR:
      return addNewSelector(state, action);
    case types.DELETE_SELECTOR:
      return deleteSelector(state, action);
    default:
      return state;
  }
};

export default reducer;
