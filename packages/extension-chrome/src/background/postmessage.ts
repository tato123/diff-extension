import { sources, actions } from "@diff/common";
import { portForId } from "./ports";

/**
 * Allows us to message a particular Tab
 * @param {*} tabId
 * @param {*} message
 */
export const postMessageToTab = (tabId: string, message: Object): void => {
  postMessageToTabWithDestination(sources.CONTENT_SCRIPT_SOURCE_NAME)(
    tabId,
    message
  );
};

/**
 * Allows us to message a particular Tab
 * @param {*} tabId
 * @param {*} message
 */
export const postMessageToTabWithDestination = (
  destination: string
): Function => (tabId: string, message: Object): void => {
  const port = portForId(tabId);
  if (!port) {
    console.error("Unable to post message");
    return;
  }
  port.postMessage(
    actions.composeRemoteAction(
      message,
      sources.BACKGROUND_SCRIPT_PORT_NAME,
      destination
    )
  );
};
