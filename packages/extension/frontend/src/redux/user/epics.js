import { combineEpics, ofType } from "redux-observable";
import types from "./types";
import { from, of } from "rxjs";
import { mergeMap, catchError, map, flatMap } from "rxjs/operators";
import actions from "./actions";
import { actions as userEntityActions } from "redux/entities/users";
import { actions as commonActions, types as commonTypes } from "@diff/common";
import { actions as remoteActions } from "redux/remote";
import { actions as workspaceActions } from "redux/entities/workspaces";
import selectors from "./selectors";

const signupEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.SIGNUP_REQUEST),
    mergeMap(action => {
      return from(
        api.auth.signup(
          action.payload.email,
          action.payload.password,
          action.payload.displayName
        )
      ).pipe(
        flatMap(result => [
          actions.signupSuccess(result),
          actions.login({ refreshToken: result.refresh_token })
        ]),
        catchError(err => of(actions.signupFailed(err, action.payload.email)))
      );
    })
  );

const validateUserEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.VALIDATE_USER_REQUEST),
    mergeMap(action => {
      return from(api.auth.isUser(action.payload.email)).pipe(
        flatMap(result => [
          actions.validateUserSuccess(result),
          actions.showForm("login")
        ]),
        catchError(err =>
          of(
            actions.validateUserFailed(action.payload.email, err),
            actions.showForm("signup")
          )
        )
      );
    })
  );

const loginEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.LOGIN_REQUEST),
    mergeMap(action => {
      const { username, password, refreshToken } = action.payload;
      return from(api.auth.login(username, password, refreshToken)).pipe(
        map(token => actions.loginSuccess(token)),
        catchError(err => of(actions.loginFailed(err)))
      );
    })
  );

const storeTokenOnLoginEpic = action$ =>
  action$.pipe(
    ofType(types.LOGIN_SUCCESS),
    map(action =>
      remoteActions.postMessage(
        commonActions.cacheTokenRequest(action.payload.token.refresh_token)
      )
    )
  );

const fetchCacheTokenEpic = action$ =>
  action$.pipe(
    ofType(commonTypes.FETCH_CACHE_TOKEN.REQUEST),
    map(action => {
      return remoteActions.postMessage(action);
    })
  );

const initializeSession = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.LOGIN_SUCCESS),
    mergeMap(action => {
      const uid = selectors.currentUserIdSelector()(state$.value);

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
  signupEpic,
  validateUserEpic,
  loginEpic,
  fetchCacheTokenEpic,
  storeTokenOnLoginEpic,
  initializeSession
);
