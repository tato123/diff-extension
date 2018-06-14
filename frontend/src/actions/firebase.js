import { createAction } from "redux-actions";

export const newValue = createAction("@diff/firebase/querySnapshot", doc => ({
  doc
}));
