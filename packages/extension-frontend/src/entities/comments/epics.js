import { combineEpics, ofType } from 'redux-observable';
import { merge, of } from 'rxjs';
import { switchMap, flatMap, mapTo, catchError } from 'rxjs/operators';

import { actions as userActions } from '../users';
import { actions as selectorActions } from '../annotations';
import { types as sessionTypes, selectors as userSelectors } from '../session';

import actions from './actions';

/**
 * Handles clearing all of our comments when
 * a new workspace is selected
 * @param {*} action$
 */
const cleanCommentsEpic = action$ =>
  action$.pipe(
    ofType(sessionTypes.SELECT_WORKSPACE),
    mapTo(actions.clearComments())
  );

/**
 * Async handler, fetching all of the comments continuously
 * as part of this epic.
 *
 * @param {*} action$
 * @param {*} state$
 * @param {*} param2
 */
const fetchCommentsEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(sessionTypes.SELECT_WORKSPACE),
    switchMap(() => {
      const uid = userSelectors.currentUserIdSelector()(state$.value);
      const workspaceId = userSelectors.currentWorkspaceSelector()(
        state$.value
      );

      return api.comments.comments$(uid, workspaceId).pipe(
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
      );
    }),
    catchError(error => of(actions.fetchCommentsFailed(error.message)))
  );

/**
 * Cleaning and fetching are seperated out to show
 * that one is synchronous and one is async,
 * as a result we need to recomine the epics together
 *
 * @param {*} action$
 * @param {*} state$
 * @param {*} param2
 */
const combinedCleanAndFetch = (action$, state$, { api }) =>
  merge(
    cleanCommentsEpic(action$, state$, { api }),
    fetchCommentsEpic(action$, state$, { api })
  );

export default combineEpics(combinedCleanAndFetch);
