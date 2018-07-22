import { createSelector } from "reselect";

const widgetsDomain = state => state.widgets;

const shownSelector = name =>
  createSelector(
    widgetsDomain,
    widgets => widgets.filter(x => x.name === name).length > 0
  );

const valuesSelector = name =>
  createSelector(
    widgetsDomain,
    widgets => widgets.filter(x => x.name === name)[0]
  );

export default {
  shownSelector,
  valuesSelector
};
