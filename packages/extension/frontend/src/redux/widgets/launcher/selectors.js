import { createSelector } from "reselect";

const launcherSelector = state => state.widgets.launcher;
const elementSelector = state => state.entities.selectors;

const busySelector = () =>
  createSelector(launcherSelector, launcher => launcher.busy);

const countSelector = () =>
  createSelector(elementSelector, selectors => selectors.allIds.length || 0);

export default {
  busySelector,
  countSelector
};
