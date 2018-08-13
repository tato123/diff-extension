import { combineEpics, ofType } from "redux-observable";
import types from "./types";
import { from, of } from "rxjs";
import { mergeMap, catchError, map } from "rxjs/operators";
import actions from "./actions";
import api from "./api";

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

export default combineEpics(signupEpic, validateUserEpic);
