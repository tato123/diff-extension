import "./message";
import { runFrontend } from "./frontend";
import { sendMessageToBackground, portMessages$ } from "./backgroundClient";
import { filter } from "rxjs/operators";
import { types, actions, logger } from "@diff/common";

/**
 * Our application start script, that handles
 * checking if we can autorun the application or not as well
 * as retrieving some of our intiial application data
 */
const main = () => {
  portMessages$
    .pipe(filter(({ type }) => type === types.FETCH_USER_PREFERENCES.SUCCESS))
    .subscribe(action => {
      const {
        payload: { preferences }
      } = action;

      if (
        preferences.autorunDomains &&
        preferences.autorunDomains.includes(window.location.href)
      ) {
        logger.debug("Running frontend");
        runFrontend();
      } else {
        console.log("not running");
      }
    });

  portMessages$
    .pipe(filter(({ type }) => type === types.FETCH_USER_PREFERENCES.FAILED))
    .subscribe(val => {
      console.log("cant run frontend");
    });

  // check if we can run on this domain
  sendMessageToBackground(actions.fetchUserPreferences());
};

// start our applicaiton
main();
