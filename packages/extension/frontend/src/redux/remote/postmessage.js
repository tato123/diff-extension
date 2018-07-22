import {
  MESSAGES_FRONTEND_SOURCE,
  MESSAGES_BACKGROUND_SOURCE,
  CONTENT_SCRIPT_SOURCE_NAME
} from "@diff/common/keys";
import { composeRemoteAction } from "@diff/common/actions";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";
import types from "./types";

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

const postMessageMiddleware = store => {
  onMessageObservable(store);
  return next => action => {
    if (action.type === types.POST_MESSAGE) {
      onSendMessage(action.payload.action);
    }
    return next(action);
  };
};

export default postMessageMiddleware;
