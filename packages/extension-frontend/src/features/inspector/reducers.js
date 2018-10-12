import types from './types';

const initialState = {
  active: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACTIVE:
      return {
        ...state,
        active: action.payload.value
      };
    default:
      return state;
  }
};

export default reducer;
