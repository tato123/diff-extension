import { combineEpics, ofType } from "redux-observable";
import { switchMap, flatMap, mapTo } from "rxjs/operators";

import { types as workspaceTypes } from "redux/entities/workspaces";
import { types as userTypes, selectors as userSelectors } from "redux/user";

import actions from "./actions";

import { actions as userActions } from "redux/entities/users";
import { actions as selectorActions } from "redux/entities/selectors";
import _ from "lodash";

const cleanCommentsEpic = (action$, state$, { db, api }) =>
  action$.pipe(
    ofType(userTypes.LOGIN_SUCCESS, workspaceTypes.GET_WORKSPACE_BY_ID_SUCCESS),
    mapTo({ type: "clean" })
  );

const fetchCommentsEpic = (action$, state$, { db, api }) =>
  action$.pipe(
    ofType(userTypes.LOGIN_SUCCESS, workspaceTypes.GET_WORKSPACE_BY_ID_SUCCESS),

    switchMap(() =>
      api.comments
        .comments$(
          state$.value.user.uid,
          userSelectors.currentWorkspaceSelector(state$.value)
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
        )
    )
  );

export default combineEpics(cleanCommentsEpic, fetchCommentsEpic);
