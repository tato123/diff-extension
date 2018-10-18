import { combineEpics, ofType } from 'redux-observable';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import _ from 'lodash-es';
import { types as userTypes, selectors as userSelectors } from '../session';
import actions from './actions';

const fetchEventLogEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(userTypes.SELECT_WORKSPACE),
    switchMap(() =>
      api.activity
        .userActivity$(userSelectors.currentUserIdSelector()(state$.value))
        .pipe(
          map(({ data, type }) => {
            if (type === 'added' || type === 'modified') {
              return actions.addUserSeenActivity(_.values(data)[0]);
            }

            throw new Error('Deleted type unsupported by the fetch event log');
          })
        )
    ),
    catchError(error => of(actions.addUserSeenActivityFailed(error.message)))
  );

export default combineEpics(fetchEventLogEpic);
