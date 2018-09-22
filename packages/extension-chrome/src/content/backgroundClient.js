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

/**
 * Messages from our backend
 */
export const portMessages$ = Observable.create(observer => {
  port.onMessage.addListener(msg => {
    if (msg && msg.source === sources.BACKGROUND_SCRIPT_PORT_NAME) {
      observer.next(msg);
    }
  });
});

/**
 * Messages from backend to frontend
 */
const forwardToFrontend$ = portMessages$.pipe(
  filter(evt => evt && evt.dest === sources.MESSAGES_FRONTEND_SOURCE)
);

forwardToFrontend$.subscribe(
  evt => {
    console.log(
      "[content-script] forwarding message from port to frontend",
      evt
    );
    window.postMessage(evt, "*");
  },
  error => {
    console.error(
      "[content-script] error proccessing message from backend to frontend",
      error
    );
  },
  () => {
    console.log("[content-script] disconnecting port from backend to frontend");
  }
);

portMessages$
  .pipe(
    tap(evt => console.log("[content-script] received message", evt)),
    filter(evt => evt && evt.type === types.RUN_REQUEST.REQUEST)
  )
  .subscribe(evt => {
    console.log("running frontend");
    runFrontend();
  });
