import { combineEpics, ofType } from "redux-observable";
import types from "./types";
import actions from "./actions";

import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import firebase from "firebase";

const ROOT_COLLECTION = "activity";
const SUB_COLLECTION = "seen";

/* eslint-disable */
const updateItemsInDb$ = (action, db) => {
  return Observable.create(observer => {
    const batch = db.batch();
    // get our current user
    const user = firebase.auth().currentUser;

    // create a batch of updates for all of our
    // records
    action.payload.ids.forEach(docId => {
      const record = {
        [docId]: {
          id: docId,
          created: Date.now()
        }
      };
      const activityRef = db
        .collection(ROOT_COLLECTION)
        .doc(user.uid)
        .collection(SUB_COLLECTION)
        .doc(docId);

      batch.set(activityRef, record);
    });
    batch
      .commit()
      .then(() => {
        observer.next(actions.writeUpdateItemsSeenSuccess(action.payload.ids));
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
  });
};

const updateItemsSeen = (action$, state$, { db }) =>
  action$.pipe(
    ofType(types.UPDATE_ITEMS_SEEN),
    // automatically handles switching
    // to the latest observable
    switchMap(action => updateItemsInDb$(action, db))
  );

export default combineEpics(updateItemsSeen);
