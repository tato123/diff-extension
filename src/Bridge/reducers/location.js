import { handleActions } from "redux-actions";
import { navigateTo } from "../actions/location";

const reducer = handleActions(
  {
    [navigateTo.toString()]: (state, action) => ({
      route: action.payload.route
    })
  },
  {
    route: ""
  }
);

export default reducer;
