import { ACTIONS } from "../common/keys";
import * as actionCreators from "./actions";
import "./message";
import { runFrontend } from "./frontend";
import { sendMessageToBackground, portMessages$ } from "./backgroundClient";
import { filter } from "rxjs/operators";

/**
 * Our application start script, that handles
 * checking if we can autorun the application or not as well
 * as retrieving some of our intiial application data
 */
const main = () => {
  portMessages$
    .pipe(filter(({ type }) => type === ACTIONS.VALIDATE_CAN_RUN.SUCCESS))
    .subscribe(val => {
      console.log("running frontend");
      runFrontend();
    });

  portMessages$
    .pipe(filter(({ type }) => type === ACTIONS.VALIDATE_CAN_RUN.FAILED))
    .subscribe(val => {
      console.log("cant run frontend");
    });

  // check if we can run on this domain
  sendMessageToBackground(
    actionCreators.validateCanRunRequest(window.location.hostname)
  );
};

// start our applicaiton
main();
