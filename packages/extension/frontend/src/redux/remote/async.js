import types from "./types";
import _ from "lodash";
let queue = [];

const asyncMiddleware = store => next => action => {
  // handles dequeueing any completed observers
  queue = queue.reduce((acc, val) => {
    const { observer, success, failed } = val;
    switch (action.type) {
      case success:
        observer.next(action);
        observer.complete();
        return acc;
      case failed:
        observer.error(action);
        observer.complete();
        return acc;
      default:
        return [...acc, val];
    }
  }, []);

  if (action.type === types.PROMISE_ACTION_TYPE) {
    const {
      payload: { submit, ...rest }
    } = action;

    queue.push({
      ...rest
    });

    // submit the next value
    store.dispatch(submit);
  }

  return next(action);
};

export default asyncMiddleware;
