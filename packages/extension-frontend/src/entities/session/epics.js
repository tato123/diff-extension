import jwtDecode from 'jwt-decode';
import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, catchError, map, tap, flatMap } from 'rxjs/operators';
import types from './types';
import actions from './actions';
import { actions as userEntityActions } from '../users';
import { actions as remoteActions } from '../../middleware/remote';
import { actions as workspaceActions } from '../workspaces';
import selectors from './selectors';

const getFirebaseTokenRequestEpic = action$ =>
  action$.pipe(
    ofType(types.GET_FIREBASE_TOKEN),
    map(action => remoteActions.postMessage(action))
  );

const getFirebaseTokenSuccessEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType('@diff/common/firebaseToken/success'),
    tap(action => api.auth.tokenLogin(action.payload.firebaseToken)),
    mergeMap(action => {
      const { uid } = jwtDecode(action.payload.firebaseToken);

      // synchronize our workspace
      return api.user.user$(uid).pipe(
        flatMap(user => {
          const actionMap = [
            userEntityActions.addUser(user),
            workspaceActions.clearWorkspaces(),
            ...Object.keys(user.workspaces).map(workspaceId =>
              workspaceActions.getWorkspaceById(workspaceId)
            )
          ];

          const currentWorkspace = selectors.currentWorkspaceSelector()(
            state$.value
          );

          const nextWorkspace =
            (user.workspaces && Object.keys(user.workspaces)[0]) || null;

          if (currentWorkspace !== nextWorkspace) {
            actionMap.push(actions.selectWorkspace(nextWorkspace));
          }
          return actionMap;
        }),
        catchError(err => of(actions.sessionInitFailed(err.message, uid)))
      );
    })
  );

export default combineEpics(
  getFirebaseTokenRequestEpic,
  getFirebaseTokenSuccessEpic
);
