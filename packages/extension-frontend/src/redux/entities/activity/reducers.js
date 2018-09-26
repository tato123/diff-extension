import types from './types';
import _ from 'lodash-es';

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
          [action.payload.id]: true
        },
        allIds: _.union(state.allIds, [action.payload.id])
      };
    default:
      return state;
  }
};

export default reducer;
