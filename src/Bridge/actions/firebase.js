import { createAction } from "redux-actions";

export const newValue = createAction("@diff/value", doc => ({ doc }));
