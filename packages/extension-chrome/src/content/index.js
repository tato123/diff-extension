import './message';
import { actions } from '@diff/common/dist/actions';
import browser from '@diff/common/dist/browser';
import { sendMessageToBackground } from './backgroundClient';

/**
 * Our application start script, that handles
 * checking if we can autorun the application or not as well
 * as retrieving some of our intiial application data
 */
const main = () => {
  const location = browser.url.location();
  // check if we can run on this domain
  sendMessageToBackground(
    actions.fetchUserPreferences(location.hostname, location.pathname)
  );
};

browser.storage.local.get('firebaseToken').then(token => {
  console.log('my token is', token);
});
// start our applicaiton
main();
