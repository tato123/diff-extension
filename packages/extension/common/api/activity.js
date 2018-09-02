import { Observable } from "rxjs";

export default db => {
  const activityRef = db.collection("activity");

  const userActivity$ = uid => {
    return Observable.create(observer => {
      const unsubscribe = activityRef
        .doc(uid)
        .collection("seen")
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(({ doc, type }) => {
            observer.next({ data: doc.data(), type, id: doc.id });
          });
        });
      return unsubscribe;
    });
  };

  const createUserActivity$ = (uid, eventIds) => {
    return Observable.create(observer => {
      const batch = db.batch();

      // create a batch record for everything
      eventIds.forEach(docId => {
        const record = {
          [docId]: {
            id: docId,
            created: Date.now()
          }
        };

        const seenActivityRef = activityRef
          .doc(uid)
          .collection("seen")
          .doc(docId);

        batch.set(seenActivityRef, record);
      });

      // batch everything
      batch
        .commit()
        .then(() => {
          observer.next(eventIds);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
  };

  return {
    userActivity$,
    createUserActivity$
  };
};
