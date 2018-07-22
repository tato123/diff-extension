import { ACTIONS } from "@diff/common/keys";
import types from "./types";
import jwtDecode from "jwt-decode";

const initialState = {
  byId: {},
  allIds: [],
  access_token: null,
  refresh_token: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.FETCH_CACHE_TOKEN.REQUEST:
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    case ACTIONS.FETCH_CACHE_TOKEN.SUCCESS:
      return {
        ...state,
        access_token: null,
        refresh_token: payload.token
      };
    case ACTIONS.FETCH_CACHE_TOKEN.FAILED:
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    case types.FETCH_USER_SUCCESS:
      return {
        byId: {
          ...state.byId,
          [payload.uid]: {
            photoUrl: payload.photoUrl,
            email: payload.email,
            displayName: payload.displayName,
            uid: payload.uid
          }
        },
        allIds: [...state.allIds, payload.uid]
      };
    case types.FETCH_USER_FAILED:
      console.error(payload);
      return state;
    case ACTIONS.LOGIN.REQUEST:
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    case ACTIONS.LOGIN.SUCCESS:
      const {
        token: { access_token, refresh_token }
      } = payload;
      const { claims, uid } = jwtDecode(access_token);
      console.log(jwtDecode(access_token));
      return {
        ...state,
        access_token,
        refresh_token,
        ...claims,
        selectedAccount: Object.keys(claims.accounts)[0],
        uid
      };
    case ACTIONS.LOGIN.FAILED:
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
