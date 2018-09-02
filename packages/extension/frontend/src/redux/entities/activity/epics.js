import { combineEpics, ofType } from "redux-observable";

import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { values } from "lodash";
import { types as userTypes } from "redux/user";
import actions from "./actions";
import selectors from "./selectors";

const fetchEventLogEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(userTypes.SESSION_INIT),
    switchMap(() =>
      api.activity
        .userActivity$(selectors.getCurrentUserSelector()(state$.value))
        .pipe(
          map(({ data, type }) => {
            if (type === "added") {
              return actions.addUserSeenActivity(values(data)[0]);
            }
          }),
          catchError(err => of(actions.addUserSeenActivityFailed(err)))
        )
    )
  );

export default combineEpics(fetchEventLogEpic);
