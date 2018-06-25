// @flow

export type SelectorPayload = {
  id: string,
  type: string,
  typeId: string
};

type State = {
  byId: {},
  allIds: []
};

export default {
  state: {
    byId: {},
    allIds: []
  },
  reducers: {
    addComment: (state: State, payload: SelectorPayload) => {
      return {
        byId: {
          ...state.byId,
          [payload.id]: payload
        },
        allIds: [...state.allIds, payload.id]
      };
    }
  },
  effects(dispatch) {
    return {
      addComment: async payload => {
        console.log("going to write something", payload, this.db);
      }
    };
  },
  firebaseSnapshots(dispatch, db) {
    this.db = db;
    return {
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
    };
  }
};
