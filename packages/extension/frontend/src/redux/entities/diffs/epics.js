import { combineEpics, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import _ from "lodash";
import { types as commonTypes } from "@diff/common";
import actions from "./actions";

import { operations as userOperations } from "../users";
import { actions as selectorActions } from "../selectors";

const ROOT_COLLECTION = "events";
const CONTENT_TYPE = "diff";

/**
 * Observable that will automatically
 * cancel the firestore subscription when we
 * are completed or error out
 *
 * @param {firestore} db
 * @param {Observer} cancelOn
 */
const fetchComments$ = (db, state, cancelOn) => {
  let unsubscribe = _.noop;
  const observer$ = Observable.create(observer => {
    unsubscribe = db
      .collection(ROOT_COLLECTION)
      .where("type", "==", CONTENT_TYPE)
      .where("meta.userId", "==", "system")
      .where("url.hostname", "==", window.location.hostname)
      .where("url.pathname", "==", window.location.pathname)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(({ doc, type }) => {
          if (type === "added" || type === "modified") {
            const data = doc.data();
            observer.next(
              actions.addDiff({
                id: doc.id,
                ...data
              })
            );

            // fetches single user
            observer.next(userOperations.fetchUser(data.meta.userId));

            // add our new selectors
            observer.next(
              selectorActions.addSelector({
                id: data.selector,
                type: data.type,
                typeId: doc.id
              })
            );
          }
        });
      });
  }).pipe(cancelOn);

  // on cancel of our observable unsubscribe from firestore
  observer$.subscribe(_.noop, unsubscribe, unsubscribe);

  return observer$;
};

const fetchCommentsEpic = (action$, state$, { db }) =>
  action$.pipe(
    ofType(commonTypes.LOGIN.SUCCESS),
    // automatically handles switching
    // to the latest observable
    switchMap(() =>
      fetchComments$(
        db,
        state$.value,
        takeUntil(action$.pipe(ofType(commonTypes.LOGIN.SUCCESS)))
      )
    )
  );

export default combineEpics(fetchCommentsEpic);
