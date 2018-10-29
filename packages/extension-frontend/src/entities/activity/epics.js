import { combineEpics, ofType } from 'redux-observable';

import { of } from 'rxjs';
import { switchMap, map, catchError, mapTo } from 'rxjs/operators';
import _ from 'lodash-es';
import { types as userTypes, selectors as userSelectors } from '../session';
import actions from './actions';
import types from './types';

const fetchEventLogEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(userTypes.SELECT_WORKSPACE),
    switchMap(() =>
      api.activity
        .userActivity$(userSelectors.currentUserIdSelector()(state$.value))
        .pipe(
          map(({ data, type }) => {
            if (type === 'added' || type === 'modified') {
              return actions.addUserSeenActivity(data);
            }

            throw new Error('Deleted type unsupported by the fetch event log');
          })
        )
    ),
    catchError(error => of(actions.addUserSeenActivityFailed(error.message)))
  );

const persistActivityRecord = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.PERSIST_ACTIVITY_RECORD_REQUEST),
    switchMap(action =>
      api.activity
        .createActivityRecord$(action.payload.recordType, action.payload.record)
        .pipe(mapTo(actions.createActivityRecordSuccess()))
    ),
    catchError(error => of(actions.createActivityRecordFailed(error)))
  );

export default combineEpics(fetchEventLogEpic, persistActivityRecord);
