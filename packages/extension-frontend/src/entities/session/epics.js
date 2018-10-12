import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, catchError, map, mapTo, flatMap } from 'rxjs/operators';
import _ from 'lodash-es';
import types from './types';
import actions from './actions';
import { actions as userEntityActions } from '../users';
import { actions as remoteActions } from '../../middleware/remote';
import { actions as workspaceActions } from '../workspaces';
import selectors from './selectors';

const getFirebaseCustomTokenRequestEpic = action$ =>
  action$.pipe(
    ofType(types.GET_FIREBASE_TOKEN),
    map(action => remoteActions.postMessage(action))
  );

const useCustomTokenToLoginEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType('@diff/common/firebaseToken/success'),
    mergeMap(action => api.auth.tokenLogin(action.payload.firebaseToken)),
    mapTo(actions.loginToFirebaseSuccess()),
    catchError(err => of(actions.loginToFirebaseFailed(err.message)))
  );

const initiateSessionEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.LOGIN_TO_FIREBASE_SUCCESS),
    mergeMap(() => {
      const user = api.auth.currentUser();

      // observable action that will
      // fire each time a users profile has been changed
      return api.user.user$(user.uid).pipe(
        flatMap(user => {
          // we should be update our user here
          const actionMap = [
            userEntityActions.addUser(user),
            workspaceActions.clearWorkspaces()
          ];

          // 1. Cache all the workspaces that are shown in the
          // user profile if they are new
          if (_.has(user, 'workspaces')) {
            // get all the new workspaces
            actionMap.push(
              _.keys(user.workspaces).map(workspaceId =>
                workspaceActions.getWorkspaceById(workspaceId)
              )
            );
          }

          // 2. If we have a default workspace sepcified then select that
          // - We first check if the user has specified a default workspace prference
          // - if the user has no default workspace but does have workspaces, select it, set it to default
          // - finally if we dont have workspaces, then we are in single user mode (null / userid workspace)

          // 2.1 default specified
          if (_.has(user, 'defaultWorkspaceId')) {
            actionMap.push(actions.selectWorkspace(user.defaultWorkspaceId));
          }
          // 2.2. workspaces but no default
          else if (
            _.has(user, 'workspaces') &&
            !_.has(user, 'defaultWorkspaceId')
          ) {
            const newDefaultId = _.keys(user.workspaces)[0];
            actionMap.push(actions.selectWorkspace(newDefaultId));
            actionMap.push(actions.setDefaultWorkspace(newDefaultId));
          }
          // 2.3 no workspaces, single user mode
          else {
            actionMap.push(actions.selectWorkspace(null));
          }

          //
          actionMap.push(actions.sessionInitSuccess());
          return actionMap;
        })
      );
    }),
    catchError(err => of(actions.sessionInitFailed(err.message)))
  );

export default combineEpics(
  getFirebaseCustomTokenRequestEpic,
  useCustomTokenToLoginEpic,
  initiateSessionEpic
);
