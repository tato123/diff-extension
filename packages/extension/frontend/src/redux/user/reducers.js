import jwtDecode from "jwt-decode";
import { types as commonTypes } from "@diff/common";

const initialState = {
  access_token: null,
  refresh_token: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case commonTypes.FETCH_CACHE_TOKEN.REQUEST:
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    case commonTypes.FETCH_CACHE_TOKEN.SUCCESS:
      return {
        ...state,
        access_token: null,
        refresh_token: payload.token
      };
    case commonTypes.FETCH_CACHE_TOKEN.FAILED:
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    case commonTypes.LOGIN.REQUEST:
      return {
        ...state,
        access_token: null,
        refresh_token: null
      };
    case commonTypes.LOGIN.SUCCESS:
      const {
        token: { access_token, refresh_token }
      } = payload;

      const { claims, uid } = jwtDecode(access_token);

      return {
        ...state,
        access_token,
        refresh_token,
        workspaces: {
          byIds: claims.workspaces || {},
          allIds: Object.keys(claims.workspaces || {})
        },

        uid
      };
    case commonTypes.LOGIN.FAILED:
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
