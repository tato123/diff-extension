import './message';
import { runFrontend } from './frontend';
import { sendMessageToBackground, portMessages$ } from './backgroundClient';
import { filter } from 'rxjs/operators';
import { types, actions, browser } from '@diff/common';
import _ from 'lodash';

interface FetchAction {
  type: string;
}

/**
 * Our application start script, that handles
 * checking if we can autorun the application or not as well
 * as retrieving some of our intiial application data
 */
const main = () => {
  portMessages$
    .pipe(
      filter(
        ({ type }) =>
          type === types.FETCH_USER_PREFERENCES.SUCCESS ||
          type === types.FETCH_USER_PREFERENCES.FAILED
      )
    )
    .subscribe((action: FetchAction) => {
      const { type } = action;

      if (type === types.FETCH_USER_PREFERENCES.SUCCESS) {
        console.log('[content-script] Running frontend');
        runFrontend();
      } else {
        console.log('[content-script] not running');
      }
    });

  const location = browser.url.location();
  // check if we can run on this domain
  sendMessageToBackground(
    actions.fetchUserPreferences(location.hostname, location.pathname)
  );
};

// start our applicaiton
main();
