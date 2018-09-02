import { Observable } from "rxjs";
import _ from "lodash";
import "firebase/storage";

export default db => {
  const eventsRef = db.collection("events");
  const commentsRef = eventsRef.where("type", "==", "comment");

  const comments$ = (uid, workspaceId) => {
    return Observable.create(observer => {
      const unsubscribe = commentsRef
        .where("url.hostname", "==", window.location.hostname)
        .where("url.pathname", "==", window.location.pathname)
        .where(
          !_.isNil(workspaceId) ? "meta.workspaceId" : "meta.userId",
          "==",
          !_.isNil(workspaceId) ? workspaceId : uid
        )
        .onSnapshot(
          querySnapshot => {
            if (!querySnapshot.empty) {
              querySnapshot.docChanges().forEach(({ doc, type }) => {
                const data = doc.data();
                observer.next({ data, type, id: doc.id });
              });
            }
          },
          err => observer.err(err)
        );

      return () => {
        console.log("Unsubuscribing from comments");
        unsubscribe();
      };
    });
  };

  const uploadFile = file => (dispatch, getState) => {
    const storageRef = db.app.storage().ref(`attachments/${file.name}`);
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

  const addNewComment = async (
    comment,
    selector,
    uploadAttachment,
    uid,
    workspaceId
  ) => {
    if (_.isNil(uid)) {
      throw new Error("UID cannot be undefined");
    }

    if (_.isNil(comment)) {
      throw new Error("comment cannot be undefined");
    }

    if (_.isNil(selector)) {
      throw new Error("selector cannot be undefined");
    }

    const attachments = await Promise.all(uploadAttachment.map(uploadFile));

    const record = {
      comment,
      selector,
      type: "comment",
      meta: {
        userId: uid,
        created: Date.now()
      },
      attachments,
      url: JSON.parse(JSON.stringify(window.location)) // convert to serializable only data
    };

    if (workspaceId) {
      record.meta.workspaceId = workspaceId;
    }

    const newEvent = eventsRef.doc();
    return newEvent.set(record);
  };

  return {
    comments$,
    uploadFile,
    addNewComment
  };
};
