import {
  CONTENT_SCRIPT_PORT_NAME,
  BACKGROUND_SCRIPT_PORT_NAME,
  CONTENT_SCRIPT_SOURCE_NAME,
  MESSAGES_FRONTEND_SOURCE,
  ACTIONS
} from "@diff/common/keys";
import { composeRemoteAction } from "@diff/common/actions";
import { Observable } from "rxjs";
import { runFrontend } from "./frontend";
import { filter, tap } from "rxjs/operators";

/**
 * Our unique name that connects us to our background script
 */
const port = chrome.runtime.connect({ name: CONTENT_SCRIPT_PORT_NAME });

/**
 * Allows us to communicate back to our background script
 *
 * @param {*} action
 * @param {*} cb
 */
export const sendMessageToBackground = action =>
  port.postMessage(composeRemoteAction(action, CONTENT_SCRIPT_SOURCE_NAME));

// filter only the messages from our backend
export const portMessages$ = Observable.create(observer => {
  port.onMessage.addListener(msg => observer.next(msg));
}).pipe(filter(({ source }) => source === BACKGROUND_SCRIPT_PORT_NAME));

portMessages$
  .pipe(
    tap(evt => {
      if (evt && evt.dest === MESSAGES_FRONTEND_SOURCE) {
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

actionHandler$(ACTIONS.AUTHENTICATION.REQUEST).subscribe(msg => {
  runFrontend();
});

actionHandler$(ACTIONS.RUN_REQUEST.REQUEST).subscribe(msg => {
  runFrontend();
});
