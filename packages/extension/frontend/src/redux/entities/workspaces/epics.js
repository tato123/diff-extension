import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap, flatMap, catchError } from "rxjs/operators";
import { types as commonTypes } from "@diff/common";
import types from "./types";
import actions from "./actions";
import { operations as userOperations } from "../users";
import _ from "lodash";

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
        flatMap(doc => {
          if (doc.exists) {
            const data = doc.data();

            // resolve our user
            const users = _.keys(data.users).map(user =>
              userOperations.fetchUser(user)
            );

            return [
              ...users,
              actions.getWorkspaceByIdSuccess({
                id: doc.id,
                ...data
              })
            ];
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
