import { combineEpics, ofType } from "redux-observable";

import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { values } from "lodash";
import { types as userTypes, selectors as userSelectors } from "redux/user";
import actions from "./actions";

const fetchEventLogEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(userTypes.SELECT_WORKSPACE),
    switchMap(() =>
      api.activity
        .userActivity$(userSelectors.currentUserIdSelector()(state$.value))
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
