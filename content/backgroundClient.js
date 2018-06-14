import {
  CONTENT_SCRIPT_PORT_NAME,
  BACKGROUND_SCRIPT_PORT_NAME,
  CONTENT_SCRIPT_SOURCE_NAME,
  ACTIONS
} from "../common/keys";
import { Observable } from "rxjs";
import { runFrontend } from "./frontend";
import { filter } from "rxjs/operators";

/**
 * Our unique name that connects us to our background script
 */
const port = chrome.runtime.connect({ name: CONTENT_SCRIPT_PORT_NAME });

/**
 * Allows us to communicate back to our background script
 *
 * @param {*} message
 * @param {*} cb
 */
export const sendMessageToBackground = message =>
  port.postMessage({
    ...message,
    source: CONTENT_SCRIPT_SOURCE_NAME
  });

// filter only the messages from our backend
export const portMessages$ = Observable.create(observer => {
  port.onMessage.addListener(msg => observer.next(msg));
}).pipe(filter(({ source }) => source === BACKGROUND_SCRIPT_PORT_NAME));

portMessages$.subscribe(evt => {
  console.log("[content-script] from background", evt);
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
  console.log("hey I want to run");
  runFrontend();
});
