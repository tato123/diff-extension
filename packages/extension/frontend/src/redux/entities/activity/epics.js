import { combineEpics, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import _ from "lodash";
import { types as commonTypes } from "@diff/common";
import actions from "./actions";
import firebase from "firebase";

const ROOT_COLLECTION = "activity";
const SUB_COLLECTION = "seen";

/**
 * Observable that will automatically
 * cancel the firestore subscription when we
 * are completed or error out
 *
 * @param {firestore} db
 * @param {Observer} cancelOn
 */
const fetchEventLog$ = (db, cancelOn) => {
  let unsubscribe = _.noop;
  const observer$ = Observable.create(observer => {
    const user = firebase.auth().currentUser;
    unsubscribe = db
      .collection(ROOT_COLLECTION)
      .doc(user.uid)
      .collection(SUB_COLLECTION)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(({ doc, type }) => {
          if (type === "added") {
            const data = doc.data();

            console.warn("[Ambiguous add, update, or delete]");
            observer.next(actions.readSeenActivity(_.values(data)[0]));
          }
        });
      });
  }).pipe(cancelOn);

  // on cancel of our observable unsubscribe from firestore
  observer$.subscribe(_.noop, unsubscribe, unsubscribe);

  return observer$;
};

const fetchEventLogEpic = (action$, state$, { db }) =>
  action$.pipe(
    ofType(commonTypes.LOGIN.SUCCESS),
    // automatically handles switching
    // to the latest observable
    switchMap(() =>
      fetchEventLog$(
        db,
        takeUntil(action$.pipe(ofType(commonTypes.LOGIN.SUCCESS)))
      )
    )
  );

export default combineEpics(fetchEventLogEpic);
