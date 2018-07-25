import { createSelector } from "reselect";

const launcherSelector = state => state.launcher;
const elementSelector = state => state.entities.selectors;

const busySelector = () =>
  createSelector(launcherSelector, launcher => launcher.busy);

const countSelector = () =>
  createSelector(elementSelector, selectors => selectors.allIds.length || 0);

export default {
  busySelector,
  countSelector
};
