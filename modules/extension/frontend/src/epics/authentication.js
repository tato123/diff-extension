import actionCreators from "actions";
import { MESSAGES_FRONTEND_SOURCE, ACTIONS } from "../../../common/keys";
import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { switchMap, map, catchError, tap } from "rxjs/operators";

console.log("action creators", actionCreators);

/*eslint-disable*/
const login = async (username, password) => {
  const data = {
    username,
    password
  };

  // firebase
  //   .auth()
  //   .signInWithCustomToken(userToken)
  //   .then(credential => {
  //     console.log("Signed in with credential", credential);
  //     const { user } = credential;
  //     const userRef = this.db.doc(`users/${user.uid}`);

  //     const data = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName,
  //       photoURL: user.photoURL
  //     };

  //     return userRef.set(data, { merge: true });
  //   })
  //   .catch(error => {
  //     console.log(error.message);
  //   });

  return fetch("http://localhost:8080/authenticate", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      accept: "application/json"
    }
  }).then(response => {
    if (response.ok) {
      return response.text();
    }
    throw new Error("cant proceses");
  });
};

const cacheToken = async token => {
  const message = {
    source: MESSAGES_FRONTEND_SOURCE,
    type: ACTIONS.CACHE_TOKEN.REQUEST,
    payload: {
      token
    }
  };
  window.postMessage(message, "*");
};

const loginUser$ = (action$, store) =>
  action$.pipe(
    ofType(actionCreators.loginRequest.toString()),
    switchMap(({ payload: { username, password } }) =>
      from(login(username, password)).pipe(
        tap(userToken => cacheToken(userToken)),
        map(userToken => loginSuccess(userToken)),
        catchError(() => of(loginFailed("no user")))
      )
    )
  );

export default combineEpics(loginUser$);
