import { actions, types } from '@diff/common/dist/actions';
import browser from '@diff/common/dist/browser';
import { filter, tap } from 'rxjs/operators';

import _ from 'lodash-es';
import {
  sendMessageToFrontend,
  sendMessageToBackground,
  portMessages$
} from './message';
import { runFrontend } from './frontend';

/**
 * IIFE - main
 *
 *
 * Our application start script, that handles
 * checking if we can autorun the application or not as well
 * as retrieving some of our intiial application data
 */
(() => {
  const location = browser.url.location();
  // check if we can run on this domain
  sendMessageToBackground(
    actions.fetchUserPreferences(location.hostname, location.pathname)
  );

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
      const { hostname } = browser.url.location();
      if (
        type === types.FETCH_USER_PREFERENCES.SUCCESS &&
        payload.sites.includes(hostname)
      ) {
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
})();
