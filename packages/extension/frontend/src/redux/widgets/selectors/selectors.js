import { createSelector } from "reselect";

const selectorWidgetDomain = state => state.widgets.selectors;

const inspectModeSelector = () =>
  createSelector(selectorWidgetDomain, selector => selector.inspectMode);

export default {
  inspectModeSelector
};
