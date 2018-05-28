import { createAction } from "redux-actions";

export const navigateTo = createAction("@diff/location", (route, params) => ({
  route,
  params
}));
