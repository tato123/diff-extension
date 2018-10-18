import _ from 'lodash-es';
import types from './types';

const initialState = {
  byId: {},
  allIds: [],
  invites: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_WORKSPACE_BY_ID_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload.data
        },
        allIds: _.uniq([...state.allIds, action.payload.id])
      };
    case types.ADD_INVITE_USER:
      return {
        ...state,
        invites: [...state.invites, action.payload.email]
      };
    case types.CLEAR_WORKSPACES:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
