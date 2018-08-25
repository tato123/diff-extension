import _ from "lodash";
import { fromEvent, Subject, of } from "rxjs";
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  last,
  mergeMap,
  catchError,
  multicast,
  tap
} from "rxjs/operators";

import { lighten, opacify, darken } from "polished";

import { injectGlobal } from "styled-components";

const SELECTION_CLASS = "diff-selected";
const HIGHLIGHT_CLASS = "diff-highlight";

injectGlobal`
  .diff-highlight {
    outline: 1px dashed ${darken(0.9, "#1a1b3c")} !important;
    background-color: ${opacify(0.7, lighten(0.7, "#1a1b3c"))} !important;
  }

  .diff-selected:after {
    width: 100%;
    height: 100%;
    border: 2px dashed #000;
    position: relative;
    content: '';
    display: block;
    border-radius: 2em;
  }
`;

// common selector attribute
const SELECTABLE_ATTR = "data-diff-selectable";

/**
 * The target has to specifically opt-in to turn off selectability,
 * we want to maximize the number of elements that can be selected
 * (basically everything on the page)
 *
 * @param {DOMElement}
 * @returns {Bool}
 */
const isNotSelectableElement = evt => {
  return (
    evt.target.hasAttribute(SELECTABLE_ATTR) &&
    evt.target.getAttribute(SELECTABLE_ATTR) === "false"
  );
};

/**
 * Since we are using an opt-out strategy, by default everything is
 * selectable, we want to make sure that if the attribute hasn't been
 * set we default to selectable
 * @param {DOMElement}
 * @returns {Bool}
 */
const isSelectableElement = evt => {
  if (!evt.target.hasAttribute(SELECTABLE_ATTR)) {
    return true;
  }

  return (
    evt.target.hasAttribute(SELECTABLE_ATTR) &&
    evt.target.getAttribute(SELECTABLE_ATTR) === "true"
  );
};

const clearStyles = () => {
  document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach(node => {
    node.classList.remove(HIGHLIGHT_CLASS);
  });

  document.querySelectorAll(`.${SELECTION_CLASS}`).forEach(node => {
    node.classList.remove(SELECTION_CLASS);
  });
};

/**
 * @param {Function} interceptFn a tap
 * @returns {Observable}
 */
export const inspect = (tapFn = _.noop) => {
  clearStyles();

  const clicks = fromEvent(window, "click", { capture: true }).pipe(
    mergeMap(evt => {
      evt.preventDefault();
      if (isSelectableElement(evt)) {
        return of(evt);
      } else if (isNotSelectableElement(evt)) {
        return of(null);
      } else if (!evt.target.hasAttribute(SELECTABLE_ATTR)) {
        return of(evt);
      }
    })
  );

  const move = fromEvent(document.body, "mousemove", false);

  const move$ = move.pipe(
    takeUntil(clicks),
    debounceTime(2),
    distinctUntilChanged((oldValue, newValue) => {
      const val = oldValue.target.isSameNode(newValue.target);

      // value is not the same, remove the highlighting
      // from the previous value
      if (!val) {
        oldValue.target.classList.remove(HIGHLIGHT_CLASS);
      }

      return val;
    }),
    mergeMap(evt => {
      if (isSelectableElement(evt)) {
        evt.target.classList.add(HIGHLIGHT_CLASS);
        tapFn(evt);
        return of(evt.target);
      }
      return of(null);
    }),
    last(),
    catchError(err => {
      if (err.name !== "EmptyError") {
        // ignore this error, while it's never good to raise
        // errors as a valid state, it is raised on a special condition where
        // the user closes the launcher without ever hovering over an element
        console.error(err.message);
      }
      return of(null);
    }),
    multicast(() => new Subject())
  );

  move$.subscribe(e => {
    clearStyles();

    if (e) {
      e.classList.add(SELECTION_CLASS);
    }
  });

  return move$;
};
