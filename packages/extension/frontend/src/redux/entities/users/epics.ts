import { combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import actions, { FetchUserAction } from "./actions";
import types from "./types";
import selectors from "./selectors";

const fetchUserEpic = (action$: any, state$: any, { api }: { api: any }) =>
  action$.pipe(
    ofType(types.FETCH_USER_REQUEST),
    mergeMap((action: FetchUserAction) => {
      const state = state$.value;
      const user = selectors.getUserSelector(action.payload.uid)(state);

      if (user) {
        console.warn("already have uid", action.payload.uid);
        return of(actions.fetchUserFailed("duplicate"));
      }

      return api.user.getUser(action.payload.uid).pipe(
        map(user => actions.fetchUserSuccess(user)),
        catchError(err => of(actions.fetchUserFailed(err)))
      );
    })
  );

export default combineEpics(fetchUserEpic);
