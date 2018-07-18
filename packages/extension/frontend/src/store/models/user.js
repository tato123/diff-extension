import firebase from "firebase";

export default {
  state: {
    byId: {},
    allIds: []
  },
  reducers: {
    fetchUserSuccess: (state, payload) => ({
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
    }),
    fetchUserFailed: (state, payload) => {
      console.error(payload);
      return state;
    }
  },
  effects: dispatch => ({
    async fetchUser(payload, rootState) {
      try {
        const db = firebase.firestore();
        const doc = await db
          .collection("users")
          .doc(payload.uid)
          .get();
        if (doc.exists) {
          return dispatch.user.fetchUserSuccess(doc.data());
        }
        return dispatch.user.fetchUserFailed("Unable to get user data");
      } catch (error) {
        return dispatch.user.fetchUserFailed(error.message);
      }
    }
  })
};
