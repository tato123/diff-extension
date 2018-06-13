import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";
import {
  MESSAGES_FRONTEND_SOURCE,
  MESSAGES_BACKGROUND_SOURCE
} from "../common/keys";

const messages$ = fromEvent(window, "message");

const frontend$ = messages$
  .pipe(filter(evt => evt.data.source === MESSAGES_FRONTEND_SOURCE))
  .subscribe(evt => console.log("got a message", evt));

const backend$ = messages$
  .pipe(filter(evt => evt.data.source === MESSAGES_BACKGROUND_SOURCE))
  .subscribe(evt => console.log("got a message", evt));

const unhandled$ = messages$
  .pipe(
    filter(
      evt =>
        evt.data.source !== MESSAGES_BACKGROUND_SOURCE &&
        evt.data.source !== MESSAGES_FRONTEND_SOURCE
    )
  )
  .subscribe(evt => console.log("unknown source", evt));

// const handleUnknownmessageSource = evt => {
//   if (process.env.NODE_ENV === "development") {
//     // console.warn("Unknown message source", evt);
//   }
// };

// const handleMessageFromBackend = evt => {
//   console.log("message received from backend", evt);
// };

// const handleMessageFromFrontend = (evt, sendResponse) => {
//   const { data } = evt;
//   switch (data.type) {
//     case "@diff/user/get/request":
//       sendMessage({ type: "GET_AUTH_TOKEN", source: "diff" }, response => {
//         sendResponse({
//           payload: response,
//           type: `@diff/user/get/${response === "" ? "success" : "failed"}`
//         });
//       });
//       break;
//     default:
//       if (process.env.NODE_ENV === "development") {
//         console.warn("Unhandled message type from frontend", data.type);
//       }
//   }
// };

// const respondToSource = source => data => {
//   const modifiedData = {
//     ...data,
//     source
//   };
//   window.postMessage(modifiedData, "*");
// };

// const handleMessagesReceived = evt => {
//   const { data } = evt;

//   if (data.source) {
//     switch (data.source) {
//       case "@diff/frontend":
//         handleMessageFromFrontend(
//           evt,
//           respondToSource(CONTENT_SCRIPT_SOURCE_NAME)
//         );
//         break;
//       case "@diff/backend":
//         handleMessageFromBackend(
//           evt,
//           respondToSource(CONTENT_SCRIPT_SOURCE_NAME)
//         );
//         break;
//       default:
//         handleUnknownmessageSource(evt);
//     }
//   }
// };
