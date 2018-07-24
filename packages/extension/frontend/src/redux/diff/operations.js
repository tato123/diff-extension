import { operations } from "redux/user";
import firebase from "firebase";
import actions from "./actions";
import { actions as selectorActions } from "redux/elements";

const uploadFile = file => (dispatch, getState) => {
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
};

/**
 * Persists a new comment to firestore
 *
 * @param {{comment:string, selector:string}}
 * @returns {Function}
 */
const persistComment = payload => async (dispatch, getState, { db }) => {
  const { comment, selector, attachments: uploadAttachment } = payload;
  const rootState = getState();

  const attachments = await Promise.all(uploadAttachment.map(uploadFile));

  const record = {
    comment,
    selector,
    type: "comment",
    meta: {
      accountId: rootState.user.selectedAccount,
      userId: rootState.user.uid,
      created: Date.now()
    },
    attachments,
    url: window.location.href
  };
  const newEvent = db.collection("events").doc();
  const result = await newEvent.set(record);
  console.log(result);
};

/**
 * Fetches comments from firestore
 *
 * @param {}
 * @returns {Function}
 */
const getComments = () => (dispatch, getState, { db }) => {
  db.collection("events")
    .where("type", "==", "comment")
    .where("url", "==", window.location.href)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = doc.data();

        // add our comment
        dispatch(
          actions.addComment({
            id: doc.id,
            ...data
          })
        );

        // resolve our user
        dispatch(operations.fetchUser(data.meta.userId));

        dispatch(
          selectorActions.addSelector({
            id: data.selector,
            type: data.type,
            typeId: doc.id
          })
        );
      });
    });
};

/**
 * Fetches diffs from firestore
 *
 * @param {}
 * @returns {Function}
 */
const getDiffs = () => (dispatch, getState, { db }) => {
  let unsubscribe = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      db.collection("events")
        .where("type", "==", "diff")
        .where("url", "==", window.location.href)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            dispatch(
              actions.addDiff({
                id: doc.id,
                ...data
              })
            );

            dispatch(operations.fetchUser(data.meta.userId));

            dispatch(
              selectorActions.addSelector({
                id: data.selector,
                type: data.type,
                typeId: doc.id
              })
            );
          });
        });
    } else {
      unsubscribe && unsubscribe();
    }
  });
};

export default {
  uploadFile,
  persistComment,
  getComments,
  getDiffs
};
