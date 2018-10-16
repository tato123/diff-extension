import _ from 'lodash-es';
import types from './types';

const initialState = {
  byId: {},
  allIds: [],
  meta: {
    isFetchingUser: false
  }
};

const addUserById = (state, user) => ({
  byId: {
    ...state.byId,
    [user.sub]: {
      ...user
    }
  }
});

const addUserAllIds = (state, user) => ({
  allIds: _.uniq([...state.allIds, user.sub])
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_USER_REQUEST:
      return {
        ...state,
        meta: {
          isFetchingUser: true
        }
      };
    case types.FETCH_USER_SUCCESS:
      return {
        ...addUserById(state, payload),
        ...addUserAllIds(state, payload),
        meta: {
          isFetchingUser: false
        }
      };
    case types.FETCH_USER_FAILED:
      return {
        ...state,
        meta: {
          isFetchingUser: false
        }
      };
    case types.ADD_USER:
      return {
        ...state,
        ...addUserById(state, payload.user),
        ...addUserAllIds(state, payload.user)
      };
    default:
      return state;
  }
};

export default reducer;
