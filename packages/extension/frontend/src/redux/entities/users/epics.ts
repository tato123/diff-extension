import { combineEpics, ofType } from "redux-observable";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import actions, { FetchUserAction } from "./actions";
import types from "./types";
import selectors from "./selectors";

const fetchUserEpic = (action$: any, state$: any, { api }: { api: any }) =>
  action$.pipe(
    ofType(types.FETCH_USER_REQUEST),
    map((action: FetchUserAction) => {
      const state = state$.value;
      const user = selectors.getUserSelector(action.payload.uid)(state);

      if (user) {
        console.warn("already have uid", action.payload.uid);
        return of(actions.fetchUserFailed("duplicate"));
      }

      return api.getUser(action.payload.uid).pipe(
        map(x => actions.fetchUserSuccess(x)),
        catchError(err => of(actions.fetchUserFailed(err)))
      );
    })
  );

export default combineEpics(fetchUserEpic);
