import * as firebase from "firebase";
import { Observable, Observer } from "rxjs";

export interface QueryResponse {
  data: Object;
  type: string;
  id: string;
}

export default (db: firebase.firestore.Firestore): Object => {
  const activityRef = db.collection("activity");

  const userActivity$ = (uid: string) => {
    return Observable.create((observer: Observer<QueryResponse>) => {
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

  const createUserActivity$ = (uid: string, eventIds: Array<string>) => {
    return Observable.create((observer: Observer<Array<string>>) => {
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
