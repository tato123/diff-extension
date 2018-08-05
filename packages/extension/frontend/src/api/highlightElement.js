import { fromEvent, Subject, of } from "rxjs";
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  last,
  mergeMap,
  catchError
} from "rxjs/operators";

import { lighten, opacify, darken } from "polished";

import { injectGlobal } from "styled-components";

injectGlobal`
  .diff-highlight {
    outline: 1px dashed ${darken(0.9, "#1a1b3c")} !important;
    background-color: ${opacify(0.7, lighten(0.7, "#1a1b3c"))} !important;
    transition: all 250ms ease-out;
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

/* eslint-disable */
/**
 *
 * @returns {Observable}
 */
export const inspect = () => {
  const style = `
    cursor: pointer;
    outline: 3px dashed #FF3C41;    
    background-color: rgba(60, 65, 255, 0.2)!important;
  `;

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

  const stop$ = new Subject();

  const move$ = move.pipe(
    takeUntil(clicks),
    takeUntil(stop$),
    debounceTime(5),
    distinctUntilChanged((oldValue, newValue) => {
      const val = oldValue.target.isSameNode(newValue.target);

      // value is not the same, remove the highlighting
      // from the previous value
      if (!val) {
        oldValue.target.classList.remove("diff-highlight");
      }

      return val;
    }),
    mergeMap(evt => {
      if (isSelectableElement(evt)) {
        evt.target.classList.add("diff-highlight");
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
    })
  );

  move$.subscribe(e => {
    document.querySelectorAll(".diff-highlight").forEach(node => {
      node.classList.remove("diff-highlight");
    });

    if (e) {
      e.classList.add("diff-selected");
    }
  });

  move$.stop = () => stop$.next(null);

  return move$;
};
