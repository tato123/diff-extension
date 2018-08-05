import { createSelector } from "reselect";
import _ from "lodash";
/* eslint-disable */
const selectorWidgetDomain = state => state.widgets.selectors;

const elementSelectorDomain = state => state.entities.selectors;
const activitySelectorDomain = state => state.entities.activity;

const inspectModeSelector = () =>
  createSelector(selectorWidgetDomain, selector => selector.inspectMode);

const seenCountSelector = cssSelector =>
  createSelector(
    elementSelectorDomain,
    activitySelectorDomain,
    (selectors, activity) => {
      const allItems = _.flatMap(
        selectors.byId[cssSelector],
        x => _.values(x) || []
      );

      const allActivity = activity.allIds;

      const items = _.intersection(allItems, allActivity);

      return items.length || 0;
    }
  );

const unseenCountSelector = cssSelector =>
  createSelector(
    elementSelectorDomain,
    activitySelectorDomain,
    (selectors, activity) => {
      const allItemsForId = _.flatMap(
        selectors.byId[cssSelector],
        x => _.values(x) || []
      );

      const allActivity = activity.allIds;

      const items = _.difference(allItemsForId, allActivity);

      return items.length || 0;
    }
  );

export default {
  inspectModeSelector,
  elementSelectorDomain,
  activitySelectorDomain,
  seenCountSelector,
  unseenCountSelector
};
