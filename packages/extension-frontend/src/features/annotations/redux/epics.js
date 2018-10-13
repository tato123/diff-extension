import { combineEpics, ofType } from 'redux-observable';

import { map } from 'rxjs/operators';
import _ from 'lodash-es';
import finder from '@medv/finder';
import types from './types';
import { actions as annotationActions } from '../../../entities/annotations';
import selectors from './selectors';

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

const getSelectorForElement = (element, annotations) => {
  const indexForSelector = _.findIndex(annotations, cssRule => {
    const searchedElement = document.querySelector(cssRule);
    return searchedElement === null
      ? false
      : element.isSameNode(searchedElement);
  });

  return indexForSelector !== -1
    ? annotations[indexForSelector]
    : createNewSelector(element);
};

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

export default combineEpics(addAnnotationEpic);
