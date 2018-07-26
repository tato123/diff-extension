import firebase from "firebase";
import { actions as widgetActions } from "../state";
import { actions as selectorActions } from "../selectors";

const closeDiff = () => dispatch => {
  dispatch(widgetActions.hide("diff"));
  dispatch(selectorActions.inspect());
};

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
const addNewComment = payload => async (dispatch, getState, { db }) => {
  /* eslint-disable */
  debugger;
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

export default {
  uploadFile,
  closeDiff,
  addNewComment
};