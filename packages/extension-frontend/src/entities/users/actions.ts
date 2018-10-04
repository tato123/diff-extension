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

export interface AddUserAction extends AnyAction {
  payload: {
    user: Object;
  };
}

const fetchUser = (uid: string): FetchUserAction => ({
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

const addUser = (user: Object): AddUserAction => ({
  type: types.ADD_USER,
  payload: {
    user
  }
});

export default {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailed,
  addUser
};
