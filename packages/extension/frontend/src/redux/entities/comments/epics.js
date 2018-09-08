import { combineEpics, ofType } from "redux-observable";
import { switchMap, flatMap, mapTo } from "rxjs/operators";

import { types as userTypes, selectors as userSelectors } from "redux/user";

import actions from "./actions";

import { actions as userActions } from "redux/entities/users";
import { actions as selectorActions } from "redux/entities/selectors";

const cleanCommentsEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(userTypes.SELECT_WORKSPACE),
    mapTo(actions.clearComments())
  );

const fetchCommentsEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(userTypes.SELECT_WORKSPACE),
    switchMap(() => {
      return api.comments
        .comments$(
          state$.value.user.uid,
          userSelectors.currentWorkspaceSelector()(state$.value)
        )
        .pipe(
          flatMap(({ data, type, id }) => [
            actions.addComment({
              id,
              ...data
            }),
            userActions.fetchUser(data.meta.userId),
            selectorActions.addSelector({
              id: data.selector,
              type: data.type,
              typeId: id
            })
          ])
        );
    })
  );

export default combineEpics(cleanCommentsEpic, fetchCommentsEpic);
