import { Observable } from "rxjs";
import _ from "lodash";

export default db => {
  const commentsRef = db.collection("events").where("type", "==", "comment");

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

  return {
    comments$
  };
};
