import { combineEpics, ofType } from "redux-observable";
import { Subject } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";

import { types as commonTypes } from "@diff/common";
import actions from "./actions";

import { operations as userOperations } from "../users";
import { actions as selectorActions } from "../selectors";

const ROOT_COLLECTION = "events";

/**
 * Observable that will automatically
 * cancel the firestore subscription when we
 * are completed or error out
 *
 * @param {firestore} db
 * @param {Observer} cancelOn
 */
const fetchComments$ = (db, state, cancelOn) => {
  const subject = new Subject();

  const processMessage = querySnapshot => {
    querySnapshot.docChanges().forEach(({ doc, type }) => {
      if (type === "added" || type === "modified") {
        const data = doc.data();

        subject.next(
          actions.addComment({
            id: doc.id,
            ...data
          })
        );

        // resolve our user
        subject.next(userOperations.fetchUser(data.meta.userId));

        // adds a new selector
        subject.next(
          selectorActions.addSelector({
            id: data.selector,
            type: data.type,
            typeId: doc.id
          })
        );
      }
    });
  };

  if (state.user.workspaces.allIds.length === 0) {
    db.collection(ROOT_COLLECTION)
      .where("type", "==", "comment")
      .where("meta.userId", "==", state.user.uid)
      .where("url.hostname", "==", window.location.hostname)
      .where("url.pathname", "==", window.location.pathname)
      .onSnapshot(processMessage);
  } else {
    state.user.workspaces.allIds.forEach(workspaceId => {
      db.collection(ROOT_COLLECTION)
        .where("type", "==", "comment")
        .where("meta.workspaceId", "==", workspaceId)
        .where("url.hostname", "==", window.location.hostname)
        .where("url.pathname", "==", window.location.pathname)
        .onSnapshot(processMessage);
    });
  }

  return subject.asObservable();
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
