export default {
  state: {
    byId: {},
    allIds: []
  },
  reducers: {
    addDiff: (state, payload) => {
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
    diffs: () =>
      db
        .collection("events")
        .where("type", "==", "diff")
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            dispatch.diff.addDiff({
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
