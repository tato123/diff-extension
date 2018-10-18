import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap, map, flatMap } from 'rxjs/operators';
import types from './types';
import actions from './actions';
import { actions as userActions } from '../users';
import { types as userTypes } from '../session';

const getInvitesEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(userTypes.SELECT_WORKSPACE),
    switchMap(action =>
      api.invites.invitesForWorkspace$(action.payload.workspaceId).pipe(
        map(response => {
          if (response.type === 'added' || response.type === 'modified') {
            return actions.addInviteUser(response.data.email);
          }
        }),
        catchError(err => of(actions.addInviteUserFailed(err.message)))
      )
    )
  );

const getWorkspaceByIdEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.GET_WORKSPACE_BY_ID),
    switchMap(action =>
      api.workspace.workspaceForId$(action.payload.id).pipe(
        flatMap(({ data: workspace, id: workspaceId }) =>
          // go through the workspace users and fetch each user
          [
            ...Object.keys(workspace.users).map(userId =>
              userActions.fetchUser(userId)
            ),
            actions.getWorkspaceByIdSuccess(workspace, workspaceId)
          ]
        ),
        catchError(err =>
          of(
            actions.getWorkspaceByIdFailed(
              err.message,
              action.payload.workspaceId
            )
          )
        )
      )
    )
  );

export default combineEpics(getWorkspaceByIdEpic, getInvitesEpic);
