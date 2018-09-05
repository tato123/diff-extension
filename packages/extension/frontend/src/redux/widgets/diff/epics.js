import { combineEpics, ofType } from "redux-observable";
import types from "./types";
import actions from "./actions";

import { from, of } from "rxjs";
import { flatMap, filter, map, catchError, mergeMap } from "rxjs/operators";

import {
  selectors,
  actions as selectorEntityActions
} from "redux/entities/selectors";
import { actions as widgetActions } from "redux/widgets/state";
import { actions as selectorActions } from "redux/widgets/selectors";
import { selectors as userSelectors } from "redux/user";

const updateItemsSeenEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.UPDATE_ITEMS_SEEN),
    mergeMap(action =>
      api.activity
        .createUserActivity$(
          userSelectors.currentUserIdSelector()(state$.value),
          action.payload.ids
        )
        .pipe(
          map(() => {
            return actions.updateItemsSeenSuccess(action.payload.ids);
          }),
          catchError(err => {
            return of(actions.updateItemsSeenFailed(err, action.payload.ids));
          })
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
          userSelectors.currentUserIdSelector()(state$.value),
          userSelectors.currentWorkspaceSelector()(state$.value``)
        )
      )
    )
  );

export default combineEpics(
  updateItemsSeenEpic,
  onCloseDiffEpic,
  addNewCommentEpic
);
