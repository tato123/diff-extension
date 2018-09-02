import jwtDecode from "jwt-decode";
import { types as commonTypes } from "@diff/common";
import types from "./types";

const initialState = {
  user: null,
  access_token: null,
  refresh_token: null,
  meta: {
    isFetchingToken: false,
    requiresLogin: false
  }
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case commonTypes.FETCH_CACHE_TOKEN.REQUEST:
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        meta: {
          isFetchingToken: true
        }
      };
    case commonTypes.FETCH_CACHE_TOKEN.SUCCESS:
      return {
        ...state,
        access_token: null,
        refresh_token: payload.token,
        meta: {
          isFetchingToken: false,
          requiresLogin: false
        }
      };
    case commonTypes.FETCH_CACHE_TOKEN.FAILED:
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        meta: {
          isFetchingToken: false,
          requiresLogin: true
        }
      };
    case types.LOGIN_REQUEST:
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    case types.LOGIN_SUCCESS:
      const {
        token: { access_token, refresh_token }
      } = payload;

      const { claims, uid } = jwtDecode(access_token);

      return {
        ...state,
        access_token,
        refresh_token,
        claims,
        uid
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    default:
      return state;
  }
};

export default reducer;
