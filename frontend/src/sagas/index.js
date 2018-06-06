import { all } from "redux-saga/effects";

import postMessageSagas from "./postmessage";
import authenticationSagas from "./authentication";

export default function* rootSaga() {
  yield all([...authenticationSagas, ...postMessageSagas]);
}
