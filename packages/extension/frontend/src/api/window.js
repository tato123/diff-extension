import { fromEvent } from "rxjs";
import { takeUntil, filter, debounceTime } from "rxjs/operators";
import { injectGlobal } from "styled-components";

const IGNORE_ATTRIBUTES = ["data-portal-id"];
const IGNORE_CLASSES = ["data-diff-selectable"];

// const generateSelector = e => {};

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

/**
 * 
  .diff-selected::after {
    content: "";
    border-radius: 5px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0px 0px 8px rgba(0,0,0,0.3);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .diff-selected::after {
    opacity: 1;
  }
 */

/* eslint-disable */
export const inject = async () => {
  const style = `
    cursor: pointer;
    outline: 3px dashed #FF3C41;    
    background-color: rgba(60, 65, 255, 0.2)!important;
  `;

  let lastSeen = null;

  const clicks = fromEvent(document.body, "click").pipe(
    filter(evt => {
      return evt.target.hasAttribute("data-diff-selectable")
        ? evt.target.getAttribute("data-diff-selectable") === "true"
        : true;
    })
  );

  const move = fromEvent(document.body, "mousemove");

  return new Promise((resolve, reject) => {
    // Move starts with direction: Pair the move start events with the 3rd subsequent move event,
    // but only if no end event happens in between
    move
      .pipe(
        takeUntil(clicks),
        debounceTime(3),
        filter(e => {
          if (lastSeen === e.target) {
            return true;
          }
          if (lastSeen != null) {
            lastSeen.classList.remove("diff-highlight");
          }

          lastSeen = e.target;
          return false;
        })
      )
      .subscribe(
        e => {
          e.target.classList.add("diff-highlight");
        },
        err => {
          reject(new Error(err.message));
          console.log("error", err);
        },
        e => {
          lastSeen.classList.remove("diff-highlight");
          lastSeen.classList.add("diff-selected");
          resolve(lastSeen);
        }
      );
  });
};
