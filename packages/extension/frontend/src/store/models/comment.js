// @flow
import firebase from "firebase";
import _ from "lodash";

export type SelectorPayload = {
  id: string,
  type: string,
  typeId: string
};

type State = {
  byId: {},
  allIds: []
};

/* eslint-disable */
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
        allIds: _.union([state.allIds, payload.id])
      };
    }
  },
  effects: dispatch => ({
    addNewComment: async ({ text: comment, selector }, rootState) => {
      if (!selector) {
        return;
      }

      const db = firebase.firestore();
      const record = {
        comment,
        selector,
        type: "comment",
        meta: {
          accountId: rootState.auth.selectedAccount,
          userId: rootState.auth.uid,
          created: Date.now()
        }
      };
      const newEvent = db.collection("events").doc();
      const result = await newEvent.set(record);
      console.log(result);
    }
  }),

  firebaseSnapshots: (dispatch, db) => ({
    comments: () =>
      db
        .collection("events")
        .where("type", "==", "comment")
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();

            // add our comment
            dispatch.comment.addComment({
              id: doc.id,
              ...data
            });

            // resolve our user
            dispatch.user.fetchUser({ uid: data.meta.userId });

            dispatch.selector.addSelector({
              id: data.selector,
              type: data.type,
              typeId: doc.id
            });
          });
        })
  })
};
