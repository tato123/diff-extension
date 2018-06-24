import {
  MESSAGES_FRONTEND_SOURCE,
  MESSAGES_BACKGROUND_SOURCE,
  CONTENT_SCRIPT_SOURCE_NAME,
  ACTIONS
} from "@diff/common/keys";
import { composeRemoteAction } from "@diff/common/actions";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";
import { TYPES } from "store/actions";

const onMessageObservable = store => {
  return fromEvent(window, "message")
    .pipe(
      filter(evt => {
        if (typeof evt.source === "object" && evt.data) {
          if (evt.data === "") {
            return false;
          }

          return (
            evt.data.source === MESSAGES_BACKGROUND_SOURCE ||
            evt.data.source === CONTENT_SCRIPT_SOURCE_NAME
          );
        } else if (typeof evt.source === "object" && evt.data === "") {
          return false;
        } else if (
          typeof evt.source === "string" &&
          evt.data.source !== MESSAGES_BACKGROUND_SOURCE &&
          evt.data.source !== CONTENT_SCRIPT_SOURCE_NAME
        ) {
          return false;
        }
        return true;
      })
    )
    .subscribe(({ data: action }) => {
      console.log(
        "[frontend] postMessage, from contentScript, type: MessageEvent",
        action
      );

      store.dispatch(action);
    });
};

const onSendMessage = action => {
  window.postMessage(
    composeRemoteAction(action, MESSAGES_FRONTEND_SOURCE),
    "*"
  );
};

export default {
  onInit: () => {
    console.log("Initialized post message plugin");
  },
  middleware: store => {
    const observable$ = onMessageObservable(store);
    return next => action => {
      if (action.type === TYPES.POST_MESSAGE) {
        onSendMessage(action.payload.action);
      }
      return next(action);
    };
  }
};
