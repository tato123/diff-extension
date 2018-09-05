import jwtDecode from "jwt-decode";
import { types as commonTypes } from "@diff/common";
import types from "./types";

const initialState = {
  uid: null,
  workspaceId: null,
  access_token: null,
  refresh_token: null,
  meta: {
    isFetchingToken: false,
    requiresLogin: false,
    form: "precheck"
  }
};

const handleFetchToken = (state, { type, payload }) => {
  switch (type) {
    case commonTypes.FETCH_CACHE_TOKEN.REQUEST:
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        meta: {
          ...state.meta,
          isFetchingToken: true
        }
      };
    case commonTypes.FETCH_CACHE_TOKEN.SUCCESS:
      return {
        ...state,
        access_token: null,
        refresh_token: payload.token,
        meta: {
          ...state.meta,
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
          ...state.meta,
          isFetchingToken: false,
          requiresLogin: true
        }
      };
  }
};

const handleLogin = (state, { type, payload }) => {
  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        uid: null,
        workspaceId: null,
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
        uid,
        workspaceId: null
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        uid: null,
        workspaceId: null
      };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case commonTypes.FETCH_CACHE_TOKEN.REQUEST:
    case commonTypes.FETCH_CACHE_TOKEN.SUCCESS:
    case commonTypes.FETCH_CACHE_TOKEN.FAILED:
      return handleFetchToken(state, action);
    case types.LOGIN_REQUEST:
    case types.LOGIN_SUCCESS:
    case types.LOGIN_FAILED:
      return handleLogin(state, action);
    case types.SELECT_WORKSPACE:
      return {
        ...state,
        workspaceId: action.payload.workspaceId
      };
    case types.SHOW_FORM:
      return {
        ...state,
        meta: {
          ...state.meta,
          form: action.payload.form
        }
      };
    default:
      return state;
  }
};

export default reducer;
