import jwtDecode from 'jwt-decode';
import types from './types';

const initialState = {
  workspaceId: null
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
        ...jwtDecode(action.payload.firebaseToken)
      };
    default:
      return state;
  }
};

export default reducer;
