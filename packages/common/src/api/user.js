import 'firebase/auth';

import { Observable } from 'rxjs';

export default db => {
  const userRef = db.collection('users');

  const user$ = uid => Observable.create(observer => {
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

  const getUser = uid => Observable.create(observer => {
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

  return {
    user$,
    getUser
  };
};
