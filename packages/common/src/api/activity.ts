import firebase from 'firebase';
import { Observable, Observer, from } from 'rxjs';

export interface QueryResponse {
  data: Object;
  type: string;
  id: string;
}

export default (db: firebase.firestore.Firestore): Object => {
  const activityRef = db.collection('activity');

  const userActivity$ = (uid: string) =>
    Observable.create((observer: Observer<QueryResponse>) => {
      const unsubscribe = activityRef.where('uid', '==', uid).onSnapshot(
        querySnapshot => {
          querySnapshot.docChanges().forEach(({ doc, type }) => {
            observer.next({ data: doc.data(), type, id: doc.id });
          });
        },
        err => observer.error(err)
      );
      return unsubscribe;
    });

  /**
   * @deprecated
   * Do not use this method, instead use the
   * create activity record
   *
   * This method makes all sorts of nasty assumptions
   */
  const createUserActivity$ = (
    uid: string,
    eventIds: Array<string>
  ): Observable<void> => {
    const batch = db.batch();

    // create a batch record for everything
    eventIds.forEach(docId => {
      const record = {
        id: docId,
        created: Date.now(),
        type: 'event',
        uid
      };

      const seenActivityRef = activityRef.doc();

      batch.set(seenActivityRef, record);
    });

    // batch everything
    return from(batch.commit());
  };

  const createActivityRecord$ = (recordType: string, data: {}) => {
    const activityRecord = activityRef.doc();
    const user = db.app.auth().currentUser;

    if (user == null) {
      throw new Error('User is null');
    }

    const record = {
      id: activityRecord.id,
      created: Date.now(),
      type: recordType,
      uid: user.uid,
      ...data
    };

    return from(activityRecord.set(record));
  };

  return {
    userActivity$,
    createUserActivity$,
    createActivityRecord$
  };
};
