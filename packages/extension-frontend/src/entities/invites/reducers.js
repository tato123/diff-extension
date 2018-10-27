import _ from 'lodash-es';
import types from './types';

const initialState = {
  byId: {},
  allIds: [],
  meta: {
    fetching: false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INVITES_BY_ID:
      return {
        ...state,
        meta: {
          fetching: true
        }
      };
    case types.GET_INVITES_BY_ID_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...action.payload.data
          }
        },
        allIds: _.uniq([...state.allIds, action.payload.id]),
        meta: {
          fetching: false
        }
      };
    case types.GET_INVITES_BY_ID_FAILED:
      return {
        ...state,
        meta: {
          fetching: false,
          error: action.payload.error
        }
      };

    default:
      return state;
  }
};

export default reducer;
