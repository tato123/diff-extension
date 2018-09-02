import { createSelector } from "reselect";

const userSelector = state => state.user;

const getCurrentUserSelector = () =>
  createSelector(userSelector, user => user.uid);

export default {
  getCurrentUserSelector
};
