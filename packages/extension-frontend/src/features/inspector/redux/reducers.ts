import { Action } from 'redux';
import types from './types';

export interface InspectorState {
  active: boolean;
}

interface InspectorAction extends Action {
  payload: {
    value: string;
  };
}

const initialState: InspectorState = {
  active: false
};

const reducer = (state = initialState, action: InspectorAction) => {
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
