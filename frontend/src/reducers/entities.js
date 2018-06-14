import { handleActions } from "redux-actions";
import { newValue } from "../actions/firebase";
import _ from "lodash";

const reduceSelectors = (state, doc) =>
  _.union(state.selectors, [doc.selector]);

const reduceObjectSelector = key => (state, doc) => {
  if (state[key].hasOwnProperty(doc.selector)) {
    state[key][doc.selector] = [...state[key][doc.selector], doc];
  } else {
    state[key][doc.selector] = [doc];
  }

  return state[key];
};

const handleFirebaseValue = (state, action) => {
  const {
    payload: { doc }
  } = action;
  return {
    ...state,
    selectors: reduceSelectors(state, doc),
    threads: reduceObjectSelector("threads")(state, doc)
  };
};

const reducer = handleActions(
  {
    [newValue.toString()]: handleFirebaseValue
  },
  {
    selectors: [],
    threads: {}
  }
);

export default reducer;
