import { combineEpics, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError, flatMap } from 'rxjs/operators';

import types from './types';
import actions from './actions';

const inviteToWorkspaceEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.INVITE_TO_WORKSPACE_REQUEST),
    mergeMap(action =>
      from(
        api.workspace.inviteCollaborator(
          action.payload.email,
          action.payload.firstName,
          action.payload.lastName,
          action.payload.workspaceId
        )
      ).pipe(
        map(() =>
          actions.inviteToWorkspaceSuccess(
            action.payload.email,
            action.payload.workspaceId
          )
        ),
        catchError(error =>
          of(
            actions.inviteToWorkspaceFailed(
              action.payload.email,
              action.payload.workspaceId,
              error.message
            )
          )
        )
      )
    ),
    catchError(error =>
      of(actions.inviteToWorkspaceFailed(null, null, error.message))
    )
  );

/**
 * Attempts to create a new workspace for the current user id
 * @param {*} action$
 * @param {*} state$
 * @param {*} param2
 */
const createWorkspaceEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.CREATE_WORKSPACE),
    mergeMap(action =>
      from(api.workspace.createWorkspace(action.payload.name)).pipe(
        flatMap(({ workspaceId }) => [
          ...action.payload.emails.map(email =>
            actions.addWorkspaceUser(email, workspaceId)
          ),
          actions.createWorkspaceSuccess(action.payload.name)
        ]),
        catchError(error =>
          of(
            actions.createWorkspaceFailed(
              action.payload.workspace,
              error.message
            )
          )
        )
      )
    )
  );

export default combineEpics(inviteToWorkspaceEpic, createWorkspaceEpic);
