import { combineEpics, ofType } from "redux-observable";
import { switchMap, flatMap, mapTo } from "rxjs/operators";

import { types as commonTypes } from "@diff/common";
import { types as workspaceTypes } from "redux/entities/workspaces";

import actions from "./actions";

import { operations as userOperations } from "../users";
import { actions as selectorActions } from "../selectors";
import _ from "lodash";

const cleanCommentsEpic = (action$, state$, { db, api }) =>
  action$.pipe(
    ofType(
      commonTypes.LOGIN.SUCCESS,
      workspaceTypes.GET_WORKSPACE_BY_ID_SUCCESS
    ),
    mapTo({ type: "clean" })
  );

const fetchCommentsEpic = (action$, state$, { db, api }) =>
  action$.pipe(
    ofType(
      commonTypes.LOGIN.SUCCESS,
      workspaceTypes.GET_WORKSPACE_BY_ID_SUCCESS
    ),

    switchMap(() =>
      api.comments
        .comments$(
          state$.value.user.uid,
          _.get(state$.value.entities, "workspaces.allIds[0]")
        )
        .pipe(
          flatMap(({ data, type, id }) => [
            actions.addComment({
              id,
              ...data
            }),
            userOperations.fetchUser(data.meta.userId),
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
