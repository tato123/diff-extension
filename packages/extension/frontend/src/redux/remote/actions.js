import { Observable } from "rxjs";
import types from "./types";

const observableAction = ({ submit, success, failed, dispatch }) => {
  return Observable.create(observer => {
    const action = {
      type: types.PROMISE_ACTION_TYPE,
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
  type: types.POST_MESSAGE,
  payload: {
    action
  }
});

export default {
  observableAction,
  promisedAction,
  postMessage
};
