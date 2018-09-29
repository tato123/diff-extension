import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { types, sources, actions } from '@diff/common/dist/actions';
import { runFrontend } from './frontend';

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

/**
 * Handle a right click event
 */
portMessages$
  .pipe(
    tap(evt => console.log('[content-script] received message', evt)),
    filter(evt => evt && evt.type === types.RUN_REQUEST.REQUEST)
  )
  .subscribe(evt => {
    console.log('running frontend');
    runFrontend();
  });

/**
 * Handle automatically running
 */
portMessages$
  .pipe(
    filter(
      ({ type }) =>
        type === types.FETCH_USER_PREFERENCES.SUCCESS ||
        type === types.FETCH_USER_PREFERENCES.FAILED
    )
  )
  .subscribe(action => {
    const { type, payload } = action;
    if (type === types.FETCH_USER_PREFERENCES.SUCCESS) {
      console.log('[content-script] Running frontend');
      runFrontend().then(() => {
        sendMessageToFrontend({
          type: types.FEATURE_FLAGS_UPDATE,
          payload
        });
      });
    } else {
      console.log('[content-script] not running');
    }
  });
