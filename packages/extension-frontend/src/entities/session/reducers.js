import types from './types';

const initialState = {
  workspaceId: null,
  id_token: null,
  featureFlags: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_WORKSPACE:
      return {
        ...state,
        workspaceId: action.payload.workspaceId
      };
    case types.GET_FIREBASE_TOKEN:
      return {
        ...state
      };
    case types.GET_FIREBASE_TOKEN_SUCCESS:
      return {
        ...state,
        id_token: action.payload.firebaseToken
      };
    default:
      return state;
  }
};

export default reducer;
