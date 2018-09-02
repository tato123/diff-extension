import "./message";
import { runFrontend } from "./frontend";
import { sendMessageToBackground, portMessages$ } from "./backgroundClient";
import { filter } from "rxjs/operators";
import { types, actions } from "@diff/common";
import _ from "lodash";

/**
 * Domain matcher checks to see we are on the same domain / subdomain
 * and resource
 *
 * @param {Array} domainList
 * @param {String} toMatch
 * @returns {Boolean}
 */
const isDomainMatch = (domainList, toMatch) => {
  if (!_.isArray(domainList) || _.isNil(toMatch)) {
    return false;
  }

  const { hostname, pathname } = new URL(toMatch);
  const val = _.filter(domainList, location => {
    const fromPreferencesUrl = _.isString(location)
      ? new URL(location)
      : location;
    return (
      hostname === fromPreferencesUrl.hostname &&
      pathname === fromPreferencesUrl.pathname
    );
  });

  return val.length > 0;
};

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

      if (isDomainMatch(preferences.autorunDomains, window.location.href)) {
        console.log("Running frontend");
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
