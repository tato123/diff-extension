import { createSelector } from "reselect";

const selectorWidgetDomain = state => state.widgets.selector;

const inspectModeSelector = () =>
  createSelector(selectorWidgetDomain, selector => selector);

export default {
  inspectModeSelector
};
