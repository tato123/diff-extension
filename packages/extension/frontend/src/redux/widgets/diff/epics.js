import { combineEpics, ofType } from "redux-observable";
import types from "./types";
import actions from "./actions";

import { Observable } from "rxjs";
import { switchMap, flatMap, filter } from "rxjs/operators";
import firebase from "firebase";

import {
  selectors,
  actions as selectorEntityActions
} from "redux/entities/selectors";
import { actions as widgetActions } from "redux/widgets/state";
import { actions as selectorActions } from "redux/widgets/selectors";

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

const updateItemsSeenEpic = (action$, state$, { db }) =>
  action$.pipe(
    ofType(types.UPDATE_ITEMS_SEEN),
    // automatically handles switching
    // to the latest observable
    switchMap(action => updateItemsInDb$(action, db))
  );

const onCloseDiffEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.CLOSE_DIFF),
    flatMap(action => {
      // get our selector
      const selectorEmpty = selectors.isSelectorEmpty(
        action.payload.selectorId
      )(state$.value);

      // if we didn't add anything and its still
      return [
        widgetActions.hide("diff"),
        selectorActions.inspect(),
        selectorEmpty &&
          selectorEntityActions.deleteSelector(action.payload.selectorId)
      ];
    }),
    filter(x => x)
  );

export default combineEpics(updateItemsSeenEpic, onCloseDiffEpic);
