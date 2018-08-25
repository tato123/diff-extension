import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

const uploadFile = file => (dispatch, getState) => {
  const storageRef = firebase.storage().ref(`attachments/${file.name}`);
  const task = storageRef.put(file);

  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      function progress(snapshot) {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(percentage);
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
  const { comment, selector, attachments: uploadAttachment } = payload;
  const rootState = getState();

  const attachments = await Promise.all(uploadAttachment.map(uploadFile));

  const record = {
    comment,
    selector,
    type: "comment",
    meta: {
      userId: rootState.user.uid,
      created: Date.now()
    },
    attachments,
    url: JSON.parse(JSON.stringify(window.location)) // convert to serializable only data
  };

  const allWorkspaces = rootState.entities.workspaces.allIds;
  if (allWorkspaces && allWorkspaces.length > 0) {
    record.meta.workspaceId = allWorkspaces[0];
  }

  const newEvent = db.collection("events").doc();
  await newEvent.set(record);
};

export default {
  uploadFile,
  addNewComment
};
