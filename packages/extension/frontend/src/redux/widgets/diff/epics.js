import { combineEpics, ofType } from "redux-observable";
import types from "./types";
import actions from "./actions";

import { from } from "rxjs";
import { switchMap, flatMap, filter, map, catchError } from "rxjs/operators";

import {
  selectors,
  actions as selectorEntityActions
} from "redux/entities/selectors";
import { actions as widgetActions } from "redux/widgets/state";
import { actions as selectorActions } from "redux/widgets/selectors";
import mySelectors from "./selectors";

const updateItemsSeenEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.UPDATE_ITEMS_SEEN),
    switchMap(action =>
      api.activity
        .createUserActivity$(
          mySelectors.getCurrentUserId()(state$.value),
          action.payload.ids
        )
        .pipe(
          map(eventIds => actions.updateItemsSeenSuccess(eventIds)),
          catchError(err =>
            actions.updateItemsSeenFailed(err, action.payload.ids)
          )
        )
    )
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

const addNewCommentEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.ADD_NEW_COMMENT),
    map(action =>
      from(
        api.comments.addNewComment(
          action.payload.comment,
          action.payload.selector,
          action.payload.attachments,
          mySelectors.getCurrentUserId()(state$.value),
          mySelectors.getCurrentWorkspace()(state$.value``)
        )
      )
    )
  );

export default combineEpics(
  updateItemsSeenEpic,
  onCloseDiffEpic,
  addNewCommentEpic
);
