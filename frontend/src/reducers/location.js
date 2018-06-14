import { handleActions } from "redux-actions";
import { navigateTo } from "../actions/location";

const reducer = handleActions(
  {
    [navigateTo.toString()]: (state, action) => ({
      route: action.payload.route,
      params: {
        ...(action.payload.params || {})
      }
    })
  },
  {
    route: "/"
  }
);

export default reducer;
