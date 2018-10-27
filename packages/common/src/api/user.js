import 'firebase/auth';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export default db => {
  const userRef = db.collection('users');

  const user$ = uid =>
    Observable.create(observer => {
      if (uid == null || uid === undefined) {
        observer.error('uid cannot be null');
        observer.complete();
        return;
      }

      const unsubscribe = userRef.doc(uid).onSnapshot(doc => {
        const data = doc.data();
        observer.next(data);
      });

      return unsubscribe;
    });

  const getUser = uid =>
    Observable.create(observer => {
      db.collection('users')
        .doc(uid)
        .get()
        .then(doc => {
          if (!doc.exists) {
            observer.error('no user');
          } else {
            observer.next(doc.data());
          }
        })
        .catch(err => {
          observer.error(err.message);
        })
        .finally(() => {
          observer.complete();
        });
    });

  const getCurrentUser$ = () =>
    Observable.create(observer => {
      const unsubscribe = db.app.auth().onAuthStateChanged(user => {
        if (user) {
          observer.next(user);
        }
      });
      return unsubscribe;
    }).pipe(mergeMap(user => getUser(user.uid)));

  const setDefaultWorkspace$ = workspaceId => {
    const user = db.app.auth().currentUser;

    return from(
      db
        .collection('users')
        .doc(user.uid)
        .update({
          defaultWorkspaceId: workspaceId
        })
    );
  };

  return {
    user$,
    getUser,
    getCurrentUser$,
    setDefaultWorkspace$
  };
};
