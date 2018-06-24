export default {
  state: {
    byId: {},
    allIds: []
  },
  reducers: {
    addComment: (state, payload) => {
      return {
        byId: {
          ...state.byId,
          [payload.id]: payload
        },
        allIds: [...state.allIds, payload.id]
      };
    }
  },
  firebaseSnapshots: (dispatch, db) => ({
    comments: () =>
      db
        .collection("events")
        .where("type", "==", "comment")
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            dispatch.comment.addComment({
              id: doc.id,
              ...data
            });

            dispatch.selector.addSelector({
              id: data.selector,
              type: data.type,
              typeId: doc.id
            });
          });
        })
  })
};
