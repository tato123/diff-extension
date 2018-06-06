import { createSelector } from "reselect";

const userDomain = state => state && state.user;

export const userTokenSelector = createSelector(
  userDomain,
  user => (user ? user.token : null)
);
