import { switchMap } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { dispatch } from "@rematch/core";

export const TYPES = {
  PROMISE_ACTION_TYPE: "@diff/async",
  POST_MESSAGE: "@diff/postmessage"
};

const observableAction = ({ submit, success, failed }) => {
  return Observable.create(observer => {
    const action = {
      type: TYPES.PROMISE_ACTION_TYPE,
      payload: {
        submit,
        success,
        failed,
        observer
      }
    };
    dispatch(action);
  });
};

const promisedAction = (...args) => observableAction(...args).toPromise();

const postMessage = action => ({
  type: TYPES.POST_MESSAGE,
  payload: {
    action
  }
});

export const ACTIONS = {
  observableAction,
  promisedAction,
  postMessage
};
