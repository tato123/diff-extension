import { Observable } from "rxjs";

export default db => {
  const workspaceRef = db.collection("workspaces");
  const invitesRef = db.collection("invites");

  const workspaces$ = uid => {
    return Observable.create(observer => {
      const unsubscribe = workspaceRef
        .where(`users.${uid}.role`, ">", "")
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

      return unsubscribe;
    });
  };

  const invites$ = email => {
    return Observable.create(observer => {
      const unsubscribe = invitesRef.where(`email`, "==", email).onSnapshot(
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

      return unsubscribe;
    });
  };

  return {
    workspaces$,
    invites$
  };
};
