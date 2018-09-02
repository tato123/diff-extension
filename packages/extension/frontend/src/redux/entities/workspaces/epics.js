import { combineEpics, ofType } from "redux-observable";
import { from, of, Subject } from "rxjs";
import { mergeMap, flatMap, catchError } from "rxjs/operators";
import types from "./types";
import actions from "./actions";
import { operations as userOperations } from "redux/entities/users";
import { types as userTypes } from "redux/user";
import selectors from "./selectors";
import _ from "lodash";

const getInvitesEpic = (action$, state$, { db }) =>
  action$.pipe(
    ofType(userTypes.LOGIN_SUCCESS),
    mergeMap(action => {
      const workspaceId = selectors.defaultWorkspaceSelector()(state$.value);
      if (_.isNil(workspaceId)) {
        return of(actions.addInviteUserFailed("No default workspace to check"));
      }
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

const getWorkspacesEpic = (action$, state$, { db }) =>
  action$.pipe(
    ofType(userTypes.LOGIN_SUCCESS),
    mergeMap(action => {
      const subject = new Subject();
      const uid = state$.value.user.uid;
      const unsubscribe = db
        .collection("workspace")
        .where(`users.${uid}.role`, ">", "")
        .onSnapshot(querySnapshot => {
          // review only the changes that occured`
          querySnapshot.docChanges().forEach(({ doc, type }) => {
            if (type === "added" || type === "modified") {
              const workspace = doc.data();

              Object.keys(workspace.users).forEach(userId => {
                // resolve our user
                subject.next(userOperations.fetchUser(userId));
              });

              subject.next(
                actions.getWorkspaceByIdSuccess({
                  id: doc.id,
                  ...workspace
                })
              );
            } else {
              // handle removal
            }
          });
        });
      subject.subscribe(_.noop, _.noop, unsubscribe);
      return subject.asObservable();
    })
  );

const getWorkspaceByIdEpic = (action$, state$, { db }) =>
  action$.pipe(
    ofType(userTypes.LOGIN_SUCCESS, types.GET_WORKSPACE_BY_ID),
    mergeMap(action => {
      const workspaceId = selectors.defaultWorkspaceSelector()(state$.value);
      if (_.isNil(workspaceId)) {
        return of(
          actions.getWorkspaceByIdFailed(workspaceId, "No default workspace")
        );
      }

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

export default combineEpics(
  getWorkspaceByIdEpic,
  getInvitesEpic,
  getWorkspacesEpic
);
