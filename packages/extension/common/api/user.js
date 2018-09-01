import "@firebase/auth";

import { Observable } from "rxjs";

export default db => {
  const userRef = db.collection("users");

  const user$ = uid => {
    return Observable.create(observer => {
      const unsubscribe = userRef.doc(uid).onSnapshot(doc => {
        const data = doc.data();
        observer.next(data);
      });

      return unsubscribe;
    });
  };

  const getUser = uid => {
    return Observable.create(async observer => {
      const doc = await db
        .collection("users")
        .doc(uid)
        .get();
      if (doc.exists) {
        observer.error("no user");
      } else {
        observer.next(doc.data());
      }
      observer.complete();
    });
  };

  return {
    user$,
    getUser
  };
};
