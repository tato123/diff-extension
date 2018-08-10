import { combineEpics, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";

import types from "./types";
import actions from "./actions";

const ROOT_COLLECTION = "workspaces";
const SUB_COLLECTION = "collaborators";

// ----------------------------------------------------------------
// Observables

/**
 *
 * @param {*} db
 * @param {*} state
 * @param {*} action
 */
const createCollaboratorObservable = (db, state, action) => {
  // check if a group exists

  //
  return Observable.create(observer => {
    const docRef = db
      .collection(ROOT_COLLECTION)
      .doc(state.user.selectedAccount)
      .collection(SUB_COLLECTION)
      .doc(action.payload.email);

    if (docRef.exists) {
      observer.error(
        actions.addWorkspaceUserFailed(
          action.payload.email,
          "User already invited"
        )
      );
    } else {
      const record = {
        email: action.payload.email,
        created: Date.now(),
        accepted: false
      };

      docRef.set(record);

      observer.next(actions.addWorkspaceUserSuccess(action.payload.email));
      observer.complete();
    }
  });
};
/*eslint-disable */
const createWorkspaceObservable = (db, state, action) => {
  return Observable.create(observer => {
    debugger;
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
    mergeMap(action => createCollaboratorObservable(db, state$.value, action))
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
