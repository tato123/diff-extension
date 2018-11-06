import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import actions from './actions';
import { types as sessionTypes } from '../session';

const getInvitesEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(sessionTypes.SELECT_WORKSPACE),
    switchMap(action =>
      api.invites.invitesForWorkspace$(action.payload.workspaceId).pipe(
        map(({ data, type, id }) => {
          if (type === 'added' || type === 'modified') {
            return actions.getInvitesByWorkspaceIdSuccess(data, id);
          }

          return action.getInvitesByWorkspaceIdFailed(
            new Error('Unhandled event', type, id)
          );
        }),
        catchError(error =>
          of(actions.getInvitesByWorkspaceIdFailed(error.message))
        )
      )
    )
  );

export default combineEpics(getInvitesEpic);
