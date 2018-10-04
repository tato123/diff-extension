import { combineEpics, ofType } from 'redux-observable';
import { switchMap, flatMap, mapTo } from 'rxjs/operators';

import { actions as userActions } from '../users';
import { actions as selectorActions } from '../selectors';
import { types as userTypes, selectors as userSelectors } from '../session';

import actions from './actions';

const cleanCommentsEpic = action$ =>
  action$.pipe(
    ofType(userTypes.SELECT_WORKSPACE),
    mapTo(actions.clearComments())
  );

const fetchCommentsEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(userTypes.SELECT_WORKSPACE),
    switchMap(() =>
      api.comments
        .comments$(
          state$.value.user.uid,
          userSelectors.currentWorkspaceSelector()(state$.value)
        )
        .pipe(
          flatMap(({ data, id }) => [
            actions.addComment({
              id,
              ...data
            }),
            userActions.fetchUser(data.meta.userId),
            selectorActions.addSelector({
              id: data.selector,
              type: data.type,
              typeId: id
            })
          ])
        )
    )
  );

export default combineEpics(cleanCommentsEpic, fetchCommentsEpic);
