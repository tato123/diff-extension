import { createAction } from "redux-actions";

const identity = () => {};

export const asyncActionCreate = (
  name,
  base,
  request = identity,
  success = identity,
  failed = identity
) => ({
  [`${name}Request`]: createAction(base["REQUEST"], request),
  [`${name}Success`]: createAction(base["SUCCESS"], success),
  [`${name}Failed`]: createAction(base["FAILED"], failed)
});
