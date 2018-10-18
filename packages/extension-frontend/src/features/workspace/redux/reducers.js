import types from './types';

const initialState = {
  meta: {
    createWorkspace: {
      isSubmitting: false,
      submitError: false
    }
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_WORKSPACE:
      return {
        ...state,
        meta: {
          ...state.meta,
          createWorkspace: {
            isSubmitting: true,
            submitError: false
          }
        }
      };
    case types.CREATE_WORKSPACE_SUCCESS:
      return {
        ...state,
        meta: {
          ...state.meta,
          createWorkspace: {
            isSubmitting: false,
            submitError: false
          }
        }
      };
    case types.CREATE_WORKSPACE_FAILED:
      return {
        ...state,
        meta: {
          ...state.meta,
          createWorkspace: {
            isSubmitting: false,
            submitError: true
          }
        }
      };
    default:
      return state;
  }
};

export default reducer;
