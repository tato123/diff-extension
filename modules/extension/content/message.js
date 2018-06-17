import { fromEvent, merge } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import {
  MESSAGES_FRONTEND_SOURCE,
  MESSAGES_BACKGROUND_SOURCE,
  ACTIONS
} from "@diff/common/keys";
import { sendMessageToBackground } from "./backgroundClient";
const messages$ = fromEvent(window, "message").pipe(
  filter(evt => {
    if (!evt.data) {
      return false;
    }
    if (evt.dest === MESSAGES_FRONTEND_SOURCE) {
      return false;
    }
    if (evt.data && evt.data.dest === MESSAGES_FRONTEND_SOURCE) {
      return false;
    }

    return true;
  })
);

const frontend$ = messages$.pipe(
  filter(evt => evt.data.source === MESSAGES_FRONTEND_SOURCE),
  tap(evt =>
    console.log(
      "[content-script] postMessage, from frontend, type: MessageEvent",
      evt.data
    )
  )
);

const backend$ = messages$.pipe(
  filter(evt => evt.data.source === MESSAGES_BACKGROUND_SOURCE),
  tap(evt =>
    console.log(
      "[content-script] postMessage, from backend, type: MessageEvent",
      evt.data
    )
  )
);

const unhandled$ = messages$.pipe(
  filter(
    evt =>
      evt.data.source !== MESSAGES_BACKGROUND_SOURCE &&
      evt.data.source !== MESSAGES_FRONTEND_SOURCE
  )
  // tap(evt => console.log("[content-script] unhandled message", evt))
);

const cacheRequest$ = frontend$.pipe(
  map(evt => evt.data),
  filter(data => data.type === ACTIONS.CACHE_TOKEN.REQUEST)
);

export const frontendHandlers = merge(cacheRequest$).subscribe(
  sendMessageToBackground
);

messages$.subscribe();
