import { Observable } from "rxjs";

export const onUserWorkspaces = db => uid => {
  return Observable.create(observer => {
    const unsubscribe = db
      .collection("workspace")
      .where(`users.${uid}.role`, ">", "")
      .where("status", "==", "pending")
      .onSnapshot(
        querySnapshot => {
          querySnapshot.docChanges().forEach(({ doc, type }) => {
            const data = doc.data();
            observer.next({ data, type });
          });
        },
        err => {
          observer.err(err);
        }
      );

    return () => {
      unsubscribe();
    };
  });
};

export const getUserWorkspaces = db => uid => {
  return Observable.create(observer => {
    db.collection("workspace")
      .where(`users.${uid}.role`, ">", "")
      .where("status", "==", "pending")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          observer.next(doc.data());
        });
        observer.complete();
      })
      .catch(err => observer.err(err));

    return () => {
      // empty teardown
    };
  });
};
