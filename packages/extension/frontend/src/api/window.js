import { fromEvent, Subject, of } from "rxjs";
import {
  takeUntil,
  filter,
  debounceTime,
  distinctUntilChanged,
  last,
  map,
  empty,
  catchError
} from "rxjs/operators";
import { injectGlobal } from "styled-components";

injectGlobal`
  .diff-highlight {
    cursor: pointer;
    outline: 2px dashed #FF3C41;    
    background-color: rgba(60, 65, 255, 0.2)!important;
  }

  .diff-selected {
    outline: 2px dashed #1e1e3e;
  }

`;

/* eslint-disable */
export const inspect = () => {
  const style = `
    cursor: pointer;
    outline: 3px dashed #FF3C41;    
    background-color: rgba(60, 65, 255, 0.2)!important;
  `;

  const clicks = fromEvent(document.body, "click").pipe(
    filter(evt => {
      return evt.target.hasAttribute("data-diff-selectable")
        ? evt.target.getAttribute("data-diff-selectable") === "true"
        : true;
    })
  );

  const move = fromEvent(document.body, "mousemove");

  const stop$ = new Subject();

  const move$ = move.pipe(
    takeUntil(clicks),
    takeUntil(stop$),
    debounceTime(5),
    distinctUntilChanged((oldValue, newValue) => {
      const val = oldValue.target.isSameNode(newValue.target);
      if (!val) {
        oldValue.target.classList.remove("diff-highlight");
      }
      return val;
    }),
    map(e => {
      e.target.classList.add("diff-highlight");
      return e.target;
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
