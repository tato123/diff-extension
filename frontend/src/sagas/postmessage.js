import { take, put, call, fork } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

const INCOMING_POSTMESSAGE = "@diff/postmessage/received";

function createPostMessageListener() {
  return eventChannel(emit => {
    const handlePostMessage = evt => {
      const { data } = evt;
      if (data.source === "@diff/content") {
        if (process.env.NODE_ENV === "development") {
          console.log("[POST_MESSAGE_SAGA] Response", data);
        }

        emit(data);
      }
    };

    window.addEventListener("message", handlePostMessage, "*");

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      window.removeEventListener("message", handlePostMessage, false);
    };

    return unsubscribe;
  });
}

export function* watchOnPings() {
  const postMessageChannel = yield call(createPostMessageListener);

  while (true) {
    const action = yield take(postMessageChannel);
    yield put(action);
  }
}

export default [fork(watchOnPings)];
