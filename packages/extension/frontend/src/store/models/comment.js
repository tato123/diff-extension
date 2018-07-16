// @flow
import firebase from "firebase";
import _ from "lodash";

export type CommentPayload = {
  comment: string,
  attachments: {},
  selector: string
};

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
        allIds: _.union(state.allIds, [payload.id])
      };
    }
  },
  effects: dispatch => ({
    uploadFile: async (file, rootState) => {
      const storageRef = firebase.storage().ref(`attachments/${file.name}`);
      const task = storageRef.put(file);

      return new Promise((resolve, reject) => {
        task.on(
          "state_changed",
          function progress(snapshot) {
            var percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentage);
          },
          function error(error) {
            reject(error);
          },
          function complete() {
            task.snapshot.ref.getDownloadURL().then(downloadURL => {
              resolve({ url: downloadURL, name: file.name });
            });
          }
        );
      });
    },

    addNewComment: async (payload, rootState) => {
      const { comment, selector } = payload;
      const db = firebase.firestore();

      const attachments = await Promise.all(
        payload.attachments.map(dispatch.comment.uploadFile)
      );

      const record = {
        comment,
        selector,
        type: "comment",
        meta: {
          accountId: rootState.auth.selectedAccount,
          userId: rootState.auth.uid,
          created: Date.now()
        },
        attachments,
        url: window.location.href
      };
      const newEvent = db.collection("events").doc();
      const result = await newEvent.set(record);
      console.log(result);
    }
  }),

  firebaseSnapshots: (dispatch, db) => ({
    comments: () => {
      let unsubscribe = null;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          unsubscribe = db
            .collection("events")
            .where("type", "==", "comment")
            .where("url", "==", window.location.href)
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
            });
        } else {
          unsubscribe && unsubscribe();
        }
      });
    }
  })
};
