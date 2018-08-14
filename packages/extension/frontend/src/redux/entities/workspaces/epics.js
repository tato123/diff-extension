import { combineEpics, ofType } from "redux-observable";
import { from, of, Subject } from "rxjs";
import { mergeMap, flatMap, catchError } from "rxjs/operators";
import { types as commonTypes } from "@diff/common";
import types from "./types";
import actions from "./actions";
import { operations as userOperations } from "../users";
import _ from "lodash";

const getInvitesEpic = (action$, state$, { db }) =>
  action$.pipe(
    ofType(commonTypes.LOGIN.SUCCESS),
    mergeMap(action => {
      const workspaceId = state$.value.user.workspaces.allIds[0];
      const subject = new Subject();
      db.collection("invites")
        .where("workspaceId", "==", workspaceId)
        .where("status", "==", "pending")
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            subject.next(actions.addInviteUser(data.email));
          });
        });
      return subject.asObservable();
    })
  );

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
          if (!doc.exists) {
            return actions.getWorkspaceByIdFailed(
              workspaceId,
              "document does not exist"
            );
          }

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
        }),
        catchError(err => of(actions.getWorkspaceByIdFailed(workspaceId, err)))
      );
    })
  );

export default combineEpics(getWorkspaceByIdEpic, getInvitesEpic);
