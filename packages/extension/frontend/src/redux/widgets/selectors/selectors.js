import { createSelector } from "reselect";
import { selectors as diffSelector } from "redux/widgets/diff";

const selectorWidgetDomain = state => state.widgets.selectors;

const inspectModeSelector = () =>
  createSelector(selectorWidgetDomain, selector => selector.inspectMode);

/* eslint-disable */
const countForSelector = element =>
  createSelector(
    diffSelector.elementThreadSelector(element),
    items => (Array.isArray(items) ? items.length : 0)
  );

export default {
  inspectModeSelector,
  countForSelector
};
