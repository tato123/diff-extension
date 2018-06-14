import { createAction } from "redux-actions";
import { ACTIONS } from "../../../common/keys";

const identity = _ => _;

export const getUser = createAction("@diff/user/get/request", identity);
export const getUserSuccess = createAction("@diff/user/get/success", identity);
export const getUserFailed = createAction("@diff/user/get/failed", identity);

export const loginRequest = createAction(
  ACTIONS.LOGIN.REQUEST,
  (username, password) => ({ username, password })
);

export const loginSuccess = createAction(ACTIONS.LOGIN.SUCCESS, token => ({
  token
}));

export const loginFailed = createAction(ACTIONS.LOGIN.FAILED, error => ({
  error
}));
