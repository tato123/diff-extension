import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { types as commonTypes } from "@diff/common";
import types from "./types";
import actions from "./actions";

const getWorkspaceByIdEpic = (action$, state$, { db }) =>
  action$.pipe(
    ofType(commonTypes.LOGIN.SUCCESS, types.GET_WORKSPACE_BY_ID),
    mergeMap(action => {
      const workspaceId = state$.value.user.workspaces.allIds[0];
      return from(
        db
          .collection("workspace")
          .doc(workspaceId)
          .get()
      ).pipe(
        map(doc => {
          if (doc.exists) {
            const data = doc.data();
            return actions.getWorkspaceByIdSuccess({
              id: doc.id,
              ...data
            });
          }
          return actions.getWorkspaceByIdFailed(
            workspaceId,
            "document does not exist"
          );
        }),
        catchError(err => of(actions.getWorkspaceByIdFailed(workspaceId, err)))
      );
    })
  );

export default combineEpics(getWorkspaceByIdEpic);
