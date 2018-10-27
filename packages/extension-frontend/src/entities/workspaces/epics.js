import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap, flatMap } from 'rxjs/operators';
import types from './types';
import actions from './actions';
import { actions as userActions } from '../users';

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

export default combineEpics(getWorkspaceByIdEpic);
