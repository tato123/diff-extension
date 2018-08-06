import { createSelector } from "reselect";
import _ from "lodash";

// select data from this widget
const selectorWidgetDomain = state => state.widgets.selectors;
const widgetStateDomain = state => state.widgets.state;

//
const elementSelectorDomain = state => state.entities.selectors;
const activitySelectorDomain = state => state.entities.activity;

/**
 * Currently toggled mode, allows controlling this from a global level
 */
const inspectModeSelector = () =>
  createSelector(selectorWidgetDomain, selector => selector.inspectMode);

/**
 *
 * @param {String} cssSelector
 */
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

const displayedSelector = () =>
  createSelector(widgetStateDomain, widgetState => {
    const widget = _.find(widgetState, { name: "diff" });
    return _.isNil(widget) ? null : widget.context.selector;
  });

export default {
  inspectModeSelector,
  elementSelectorDomain,
  activitySelectorDomain,
  seenCountSelector,
  unseenCountSelector,
  displayedSelector
};
