import { Observable } from "rxjs";
import { runFrontend } from "./frontend";
import { filter, tap } from "rxjs/operators";

import { types, sources, actions } from "@diff/common";

/**
 * Our unique name that connects us to our background script
 */
const port = chrome.runtime.connect({ name: sources.CONTENT_SCRIPT_PORT_NAME });

/**
 * Allows us to communicate back to our background script
 *
 * @param {*} action
 * @param {*} cb
 */
export const sendMessageToBackground = action =>
  port.postMessage(
    actions.composeRemoteAction(action, sources.CONTENT_SCRIPT_SOURCE_NAME)
  );

// filter only the messages from our backend
export const portMessages$ = Observable.create(observer => {
  port.onMessage.addListener(msg => observer.next(msg));
}).pipe(filter(({ source }) => source === sources.BACKGROUND_SCRIPT_PORT_NAME));

portMessages$
  .pipe(
    tap(evt => {
      if (evt && evt.dest === sources.MESSAGES_FRONTEND_SOURCE) {
        window.postMessage(evt, "*");
      }
    })
  )
  .subscribe(evt => {
    console.log("[content-script] received and processed", evt);
  });

// ----------------------------------------------------------------------
// Action Handlers
// ----------------------------------------------------------------------

const actionHandler$ = ACTION_TYPE =>
  portMessages$.pipe(filter(({ type }) => type === ACTION_TYPE));

actionHandler$(types.RUN_REQUEST.REQUEST).subscribe(msg => {
  runFrontend();
});
