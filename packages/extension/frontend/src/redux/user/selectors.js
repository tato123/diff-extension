import { createSelector } from "reselect";

const userSelector = state => state.user;

const accessTokenSelector = () =>
  createSelector(userSelector, user => user.access_token);

const refreshTokenSelector = () =>
  createSelector(userSelector, user => user.refresh_token);

export default {
  accessTokenSelector,
  refreshTokenSelector
};
