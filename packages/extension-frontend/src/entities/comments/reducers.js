import _ from 'lodash-es';
import types from './types';

const initialState = {
  byId: {},
  allIds: []
};

const reducer = (state = initialState, { payload, type }) => {
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

export default reducer;
