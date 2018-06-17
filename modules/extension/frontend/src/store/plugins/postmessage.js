import {
  MESSAGES_FRONTEND_SOURCE,
  MESSAGES_BACKGROUND_SOURCE,
  CONTENT_SCRIPT_SOURCE_NAME
} from "@diff/common/keys";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

export default function(options) {
  return store => {
    // receive events and dispatch a mutation
    fromEvent(window, "message")
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

        store.commit(action.type, action.payload);
      });

    // subscribe to store mutations and make changes
    store.subscribe(mutation => {
      if (mutation.type === "SEND_MESSAGE") {
      }
    });
  };
}
