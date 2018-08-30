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

  return {
    user$
  };
};
