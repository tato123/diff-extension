import { combineEpics, ofType } from "redux-observable";
import types from "./types";
import { from, of } from "rxjs";
import { mergeMap, catchError, map, flatMap } from "rxjs/operators";
import actions from "./actions";
import api from "./api";
import { actions as commonActions } from "@diff/common";
import { actions as remoteActions } from "redux/remote";

const signupEpic = action$ =>
  action$.pipe(
    ofType(types.SIGNUP_REQUEST),
    mergeMap(action => {
      return from(
        api.signup(action.payload.email, action.payload.password)
      ).pipe(
        map(result => actions.signupSuccess(result)),
        catchError(err => of(actions.signupFailed(err, action.payload.email)))
      );
    })
  );

const validateUserEpic = action$ =>
  action$.pipe(
    ofType(types.VALIDATE_USER_REQUEST),
    mergeMap(action => {
      return from(api.isUser(action.payload.email)).pipe(
        map(result => actions.validateUserSuccess(result)),
        catchError(err =>
          of(actions.validateUserFailed(action.payload.email, err))
        )
      );
    })
  );

const loginEpic = action$ =>
  action$.pipe(
    ofType(types.LOGIN_REQUEST),
    mergeMap(action => {
      /* eslint-disable */
      debugger;
      const { username, password, refreshToken } = action.payload;
      return from(api.login(username, password, refreshToken)).pipe(
        flatMap(response => {
          return [
            actions.loginSuccess(token),
            remoteActions.postMessage(commonActions.cacheTokenRequest(token))
          ];
        }),
        catchError(error => of(commonActions.loginFailed(error)))
      );
    })
  );

export default combineEpics(signupEpic, validateUserEpic, loginEpic);
