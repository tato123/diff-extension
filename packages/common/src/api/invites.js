import { Observable } from "rxjs";

export default db => {
  const invitesRef = db.collection("invites");

  const invitesForWorkspace$ = workspaceId => {
    return Observable.create(observer => {
      const unsubscribe = invitesRef
        .where("workspaceId", "==", workspaceId)
        .where("status", "==", "pending")
        .onSnapshot(
          querySnapshot => {
            querySnapshot.docChanges().forEach(({ doc, type }) => {
              const data = doc.data();
              observer.next({ data, type, id: doc.id });
            });
          },
          err => observer.err(err)
        );

      return unsubscribe;
    });
  };

  const inviteForEmail$ = email => {
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
    invitesForWorkspace$,
    inviteForEmail$
  };
};
