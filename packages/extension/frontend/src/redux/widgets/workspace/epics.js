import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap, catchError, map } from "rxjs/operators";

import types from "./types";
import actions from "./actions";

const addCollaboratorEpic = (action$, state$, { api }) =>
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

const createWorkspaceEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.CREATE_WORKSPACE),
    mergeMap(action => {
      return from(api.createWorkspace(action.payload.name)).pipe(
        map(() => actions.createWorkspaceSuccess(action.payload.name)),
        catchError(err =>
          of(actions.createWorkspaceFailed(action.payload.workspace, err))
        )
      );
    })
  );

export default combineEpics(addCollaboratorEpic, createWorkspaceEpic);
