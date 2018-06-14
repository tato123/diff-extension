import { handleActions } from "redux-actions";
import { getUser, getUserSuccess, getUserFailed } from "actions/user";

const DEFAULT_STATE = {};

const getUserReducer = (state, action) => ({
  loading: true,
  token: null
});

const getUserSuccessReducer = (state, { payload: { user } }) => ({
  ...state,
  token: user.token,
  loading: false
});

const getUserFailedReducer = (state, action) => ({
  ...state,
  token: null,
  loading: false
});

export default handleActions(
  {
    [getUser.toString()]: getUserReducer,
    [getUserSuccess.toString()]: getUserSuccessReducer,
    [getUserFailed.toString()]: getUserFailedReducer
  },
  DEFAULT_STATE
);
