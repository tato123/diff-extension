import firebase from "firebase";
import _ from "lodash";

const uploadFile = (file, rootState) => async dispatch => {
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

const addNewComment = (payload, rootState) => async dispatch => {
  const { comment, selector } = payload;
  const db = firebase.firestore();

  const attachments = await Promise.all(payload.attachments.map(uploadFile));

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
};

// firebaseSnapshots = () => {
//   comments: () => {
//     let unsubscribe = null;
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         unsubscribe = db
//           .collection("events")
//           .where("type", "==", "comment")
//           .where("url", "==", window.location.href)
//           .onSnapshot(querySnapshot => {
//             querySnapshot.forEach(doc => {
//               const data = doc.data();

//               // add our comment
//               dispatch.comment.addComment({
//                 id: doc.id,
//                 ...data
//               });

//               // resolve our user
//               dispatch.user.fetchUser({ uid: data.meta.userId });

//               dispatch.selector.addSelector({
//                 id: data.selector,
//                 type: data.type,
//                 typeId: doc.id
//               });
//             });
//           });
//       } else {
//         unsubscribe && unsubscribe();
//       }
//     });
//   };
// };

// firebaseSnapshots: (dispatch, db) => ({
//   diffs: () =>
//     db
//       .collection("events")
//       .where("type", "==", "diff")
//       .where("url", "==", window.location.href)
//       .onSnapshot(querySnapshot => {
//         querySnapshot.forEach(doc => {
//           const data = doc.data();
//           dispatch.diff.addDiff({
//             id: doc.id,
//             ...data
//           });
//           dispatch.user.fetchUser({ uid: data.meta.userId });

//           dispatch.selector.addSelector({
//             id: data.selector,
//             type: data.type,
//             typeId: doc.id
//           });
//         });
//       })
// });

export default {
  uploadFile,
  addNewComment
};
