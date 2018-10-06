import { fromEvent, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { sources, actions } from '@diff/common/dist/actions';

/**
 * Our unique name that connects us to our background script
 */
const port = chrome.runtime.connect({ name: sources.CONTENT_SCRIPT_PORT_NAME });

const baseMessages$ = fromEvent(window, 'message').pipe(
  filter(evt => {
    if (!evt.data) {
      return false;
    }
    if (evt.dest === sources.MESSAGES_FRONTEND_SOURCE) {
      return false;
    }
    if (evt.data && evt.data.dest === sources.MESSAGES_FRONTEND_SOURCE) {
      return false;
    }

    return true;
  })
);

export const frontend$ = baseMessages$.pipe(
  filter(evt => evt.data.source === sources.MESSAGES_FRONTEND_SOURCE),
  tap(evt =>
    console.log(
      '[content-script] postMessage, from frontend, type: MessageEvent',
      evt.data
    )
  )
);

export const page$ = baseMessages$.pipe(
  filter(evt => evt.data.source === '@client/INSPECTED_VIEW'),
  tap(evt =>
    console.log(
      '[content-script] postMessage, from inspected view, type: MessageEvent',
      evt.data
    )
  )
);

export const backend$ = baseMessages$.pipe(
  filter(evt => evt.data.source === sources.MESSAGES_BACKGROUND_SOURCE),
  tap(evt =>
    console.log(
      '[content-script] postMessage, from backend, type: MessageEvent',
      evt.data
    )
  )
);

export const unhandled$ = baseMessages$.pipe(
  filter(
    evt =>
      evt.data.source !== sources.MESSAGES_BACKGROUND_SOURCE &&
      evt.data.source !== sources.MESSAGES_FRONTEND_SOURCE
  )
  // tap(evt => console.log("[content-script] unhandled message", evt))
);

export const sendMessageToFrontend = action =>
  window.postMessage(
    actions.composeRemoteAction(
      action,
      sources.CONTENT_SCRIPT_SOURCE_NAME,
      sources.MESSAGES_FRONTEND_SOURCE
    ),
    '*'
  );

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
      '[content-script] forwarding message from port to frontend',
      evt
    );
    window.postMessage(evt, '*');
  },
  error => {
    console.error(
      '[content-script] error proccessing message from backend to frontend',
      error
    );
  },
  () => {
    console.log('[content-script] disconnecting port from backend to frontend');
  }
);
