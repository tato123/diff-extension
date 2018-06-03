import { call, put, takeLatest } from "redux-saga/effects";

function* fetchUser(action) {
  window.postMessage(
    {
      type: "INVOKE_CALL",
      payload: {
        hello: "butter"
      },
      source: "@diff"
    },
    "*"
  );
}

function* mySaga() {
  yield takeLatest("@diff/firebase/querySnapshot", fetchUser);
}

export default mySaga;
