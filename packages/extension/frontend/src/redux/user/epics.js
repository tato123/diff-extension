import { combineEpics, ofType } from "redux-observable";
import types from "./types";
import { from, of } from "rxjs";
import { mergeMap, catchError, map, flatMap } from "rxjs/operators";
import actions from "./actions";
import { actions as userEntityActions } from "redux/entities/users";
import { actions as commonActions, types as commonTypes } from "@diff/common";
import { actions as remoteActions } from "redux/remote";

const signupEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.SIGNUP_REQUEST),
    mergeMap(action => {
      return from(
        api.auth.signup(action.payload.email, action.payload.password)
      ).pipe(
        map(result => actions.signupSuccess(result)),
        catchError(err => of(actions.signupFailed(err, action.payload.email)))
      );
    })
  );

const validateUserEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.VALIDATE_USER_REQUEST),
    mergeMap(action => {
      return from(api.auth.isUser(action.payload.email)).pipe(
        map(result => actions.validateUserSuccess(result)),
        catchError(err =>
          of(actions.validateUserFailed(action.payload.email, err))
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
        flatMap(token => {
          return [
            actions.loginSuccess(token),
            remoteActions.postMessage(
              commonActions.cacheTokenRequest(token.refresh_token)
            )
          ];
        }),
        catchError(error => {
          return of(actions.loginFailed(error));
        })
      );
    })
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
      const uid = state$.value.user.uid;
      return api.user.getUser(uid).pipe(
        flatMap(user => [
          userEntityActions.addUser(user),
          actions.selectWorkspace(null)
        ]),
        catchError(err => of(actions.sessionInitFailed(err.message, uid)))
      );
    })
  );

export default combineEpics(
  signupEpic,
  validateUserEpic,
  loginEpic,
  fetchCacheTokenEpic,
  initializeSession
);
