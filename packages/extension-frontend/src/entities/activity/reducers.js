import _ from 'lodash-es';
import types from './types';

const initialState = {
  byId: {},
  allIds: []
};
/* eslint-disable */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER_SEEN_ACTIVITY:
      return {
        byId: {
          ...state.byId,
          [action.payload.data.id]: action.payload.data
        },
        allIds: _.union(state.allIds, [action.payload.data.id])
      };
    default:
      return state;
  }
};

export default reducer;
