import { createAction } from "redux-actions";

const newValue = createAction("@diff/firebase/querySnapshot", doc => ({
  doc
}));

export default {
  newValue
};
