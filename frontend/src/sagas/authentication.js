import { apply, takeEvery } from "redux-saga/effects";
import { getUser } from "actions/user";

function* handleUserGetRequest(action) {
  try {
    const message = {
      source: "@diff/frontend",
      ...action
    };
    yield apply(window, window.postMessage, [message, "*"]);
  } catch (err) {
    console.log("err");
  }
}

export default [takeEvery(getUser.toString(), handleUserGetRequest)];
