import { AnyAction } from "redux";
import types from "./types";

export interface ErrorAction extends AnyAction {
  payload: {
    err: string;
  };
}

export interface FetchUserAction extends AnyAction {
  payload: {
    uid: string;
  };
}

const fetchUserRequest = (uid: string): FetchUserAction => ({
  type: types.FETCH_USER_REQUEST,
  payload: {
    uid
  }
});

const fetchUserSuccess = (payload: any) => ({
  type: types.FETCH_USER_SUCCESS,
  payload
});

const fetchUserFailed = (err: string): ErrorAction => ({
  type: types.FETCH_USER_FAILED,
  payload: {
    err
  }
});

export default {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailed
};
