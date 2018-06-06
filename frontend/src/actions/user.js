import { createAction } from "redux-actions";

const identity = _ => _;

export const getUser = createAction("@diff/user/get/request", identity);
export const getUserSuccess = createAction("@diff/user/get/success", identity);
export const getUserFailed = createAction("@diff/user/get/failed", identity);
