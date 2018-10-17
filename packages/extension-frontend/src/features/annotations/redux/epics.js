import { combineEpics, ofType } from 'redux-observable';

import { from, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import _ from 'lodash-es';
import finder from '@medv/finder';
import types from './types';

import { actions as annotationActions } from '../../../entities/annotations';
import { selectors as sessionSelectors } from '../../../entities/session';

import actions from './actions';
import selectors from './selectors';

// --------------------------------------------------------------------
// Epic Helpers
// --------------------------------------------------------------------

/**
 * Using the finder library to build out a new inspector
 *
 * @param {HTMLElement} htmlElement - dom node we want a new css selector for
 * @returns string
 */
const createNewSelector = htmlElement => {
  const newSelector = finder(htmlElement, {
    seedMinLength: 4,
    className: name => {
      if (name.indexOf('df') === -1 && name.indexOf('diff') === -1) {
        return true;
      }
      return false;
    },
    optimizedMinLength: 2,
    threshold: 1000
  });

  return newSelector;
};

const isElementSameAsRule = (cssRule, element) => {
  if (!_.isString(cssRule)) {
    console.error('cssrule must be string', cssRule);
    return false;
  }

  try {
    const searchedElement = document.querySelector(cssRule);
    return searchedElement === null
      ? false
      : element.isSameNode(searchedElement);
  } catch (error) {
    console.warn('Error Searching element', error);
  }

  return false;
};

/**
 * Checks if there is an existing selector that matches the element
 * that was passed in
 * @param {*} element
 * @param {*} annotations
 */
const getSelectorForElement = (element, annotations) => {
  const indexForSelector = _.findIndex(annotations, cssRule =>
    isElementSameAsRule(cssRule, element)
  );

  return indexForSelector !== -1
    ? annotations[indexForSelector]
    : createNewSelector(element);
};

// --------------------------------------------------------------------
// Epics
// --------------------------------------------------------------------

/**
 * Adds a new annotation target. Annotations are used to identify a key
 * area in the UI that we want to track
 *
 * @param {*} action$
 * @param {*} state$
 */
const addAnnotationEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.ADD_ANNOTATION),
    map(action => {
      const annotations = selectors.allAnnotationIdsSelector(state$.value);
      const newSelector = getSelectorForElement(
        action.payload.element,
        annotations
      );
      return annotationActions.createTransientSelector(newSelector);
    })
  );

/**
 * Enables users to add a new comment to a targetted annotation
 * @param {*} action$
 * @param {*} state$
 * @param {*} param2
 */
const addNewCommentEpic = (action$, state$, { api }) =>
  action$.pipe(
    ofType(types.ADD_NEW_COMMENT),
    mergeMap(action => {
      const uid = sessionSelectors.currentUserIdSelector()(state$.value);
      const workspace = sessionSelectors.currentWorkspaceSelector()(
        state$.value
      );

      return from(
        api.comments.addNewComment(
          action.payload.comment,
          action.payload.selector,
          action.payload.attachments,
          uid,
          workspace
        )
      ).pipe(
        map(newId => actions.addCommentSuccess(newId)),
        catchError(error => of(actions.addCommentFailed(error.message)))
      );
    })
  );

export default combineEpics(addAnnotationEpic, addNewCommentEpic);
