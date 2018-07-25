import types from "./types";

const initialState = {
  byId: {},
  allIds: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_USER_REQUEST:
      return state;
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

    default:
      return state;
  }
};

export default reducer;
