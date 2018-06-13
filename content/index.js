import { ACTIONS } from "../common/keys";
import "./message";
import { runFrontend } from "./frontend";
import { sendMessageToBackground } from "./backgroundClient";

/**
 * Configure our script to startup
 */
const startup = async () => {
  try {
    // check if we can run on this domain
    const actionResponse = await sendMessageToBackground({
      type: ACTIONS.VALIDATE_CAN_RUN.REQUEST,
      payload: {
        domain: window.location.hostname
      }
    });

    if (actionResponse.type === ACTIONS.VALIDATE_CAN_RUN.SUCCESS) {
      // this handles whether we should automatically run or not
      runFrontend();
    } else if (actionResponse.type === ACTIONS.VALIDATE_CAN_RUN.FAILED) {
      // if not, then the user might be logged out or needs to do something
      console.log(
        "[content-script] cant automatically start, requires a force run",
        actionResponse
      );
    }
  } catch (err) {
    console.log(err);
  }
};

// start our applicaiton
startup();
