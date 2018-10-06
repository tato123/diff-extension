import jwtDecode from 'jwt-decode';
import { types as commonTypes } from '@diff/common';
import types from './types';

const initialState = {
  uid: null,
  workspaceId: null,
  access_token: null,
  refresh_token: null,
  featureFlags: null,
  meta: {
    isFetchingToken: false,
    requiresLogin: false,
    form: 'precheck',
    error: null
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case commonTypes.FEATURE_FLAGS_UPDATE:
      return {
        ...state,
        featureFlags: {
          ...action.payload.featureFlags
        }
      };
    case types.SELECT_WORKSPACE:
      return {
        ...state,
        workspaceId: action.payload.workspaceId
      };
    case types.SHOW_FORM:
      return {
        ...state,
        meta: {
          ...state.meta,
          submitting: false,
          form: action.payload.form
        }
      };
    default:
      return state;
  }
};

export default reducer;
