import { takeEvery, call, put } from "redux-saga/effects";
import { loginRequest, loginFailed, loginSuccess } from "actions/user";
import { MESSAGES_FRONTEND_SOURCE } from "../../../common/keys";

async function login(username, password) {
  const data = {
    username,
    password
  };

  return fetch("/localhost:3000/login", {
    method: "POST",
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      return response.text();
    }
    throw new Error("Incorrect authentication");
  });
}

function* handleUserGetRequest({ payload: { username, password } }) {
  try {
    // call our custom authentication token
    const token = yield call(login, username, password);
    if (token == null) {
      return yield put(loginFailed());
    }

    yield call(cacheToken, token);
    yield put(loginSuccess(token));
  } catch (err) {
    yield put(loginFailed(err));
  }
}

async function cacheToken(token) {
  const message = {
    source: MESSAGES_FRONTEND_SOURCE,
    type: "@diff/cacheToken/request",
    payload: {
      token
    }
  };
  window.postMessage(message, "*");
}

export default [takeEvery(loginRequest.toString(), handleUserGetRequest)];
