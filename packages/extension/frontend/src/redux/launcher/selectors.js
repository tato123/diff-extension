import { createSelector } from "reselect";

const launcherSelector = state => state.launcher;
const elementSelector = state => state.elements;

const busySelector = () =>
  createSelector(launcherSelector, launcher => launcher.busy);

const countSelector = () =>
  createSelector(elementSelector, element => element.allIds.length || 0);

export default {
  busySelector,
  countSelector
};
