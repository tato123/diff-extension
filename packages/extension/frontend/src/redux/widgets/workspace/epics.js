import { combineEpics, ofType } from "redux-observable";
import { Observable, from, of } from "rxjs";
import { mergeMap, catchError, map } from "rxjs/operators";

import types from "./types";
import actions from "./actions";
import api from "./api";

// ----------------------------------------------------------------
// Observables

const createWorkspaceObservable = (db, state, action) => {
  return Observable.create(observer => {
    const workspace = action.payload.name;
    const docRef = db.collection("workspace").doc();

    if (docRef.exists) {
      observer.error(
        actions.createWorkspaceFailed(workspace, "Workspace Exists")
      );
    } else {
      const record = {
        users: {
          [state.user.uid]: true
        },
        name: workspace
      };

      docRef.set(record);

      observer.next(actions.createWorkspaceSuccess(workspace));
      observer.complete();
    }
  });
};

// ----------------------------------------------------------------
// Epics

/**
 *
 * @param {*} action$
 * @param {*} state$
 * @param {*} param2
 */
const addCollaboratorEpic = (action$, state$, { db }) =>
  action$.pipe(
    ofType(types.ADD_WORKSPACE_USER_REQUEST),
    mergeMap(action => {
      return from(
        api.addSingleCollaborator(
          action.payload.email,
          action.payload.workspaceId
        )
      ).pipe(
        map(() =>
          actions.addWorkspaceUserSuccess(
            action.payload.email,
            action.payload.workspaceId
          )
        ),
        catchError(err =>
          of(
            actions.addWorkspaceUserFailed(
              action.payload.workspace,
              action.payload.workspaceId,
              err
            )
          )
        )
      );
    })
  );
/**
 *
 * @param {*} action$
 * @param {*} state$
 * @param {*} param2
 */
const createWorkspaceEpic = (action$, state$, { db }) =>
  action$.pipe(
    ofType(types.CREATE_WORKSPACE),
    mergeMap(action => createWorkspaceObservable(db, state$.value, action))
  );

export default combineEpics(addCollaboratorEpic, createWorkspaceEpic);
