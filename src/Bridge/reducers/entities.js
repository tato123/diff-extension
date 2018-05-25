import { handleActions } from "redux-actions";
import { newValue } from "../actions/firebase";

const reducer = handleActions(
  {
    [newValue.toString()]: (state, { payload: { doc } }) => {
      return {
        selectors: [...state.selectors, doc]
      };
    }
  },
  {
    selectors: []
  }
);

export default reducer;
