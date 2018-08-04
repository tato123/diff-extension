import { createSelector } from "reselect";
import _ from "lodash";

const launcherSelectorDomain = state => state.widgets.launcher;
const elementSelectorDomain = state => state.entities.selectors;
const activitySelectorDomain = state => state.entities.activity;

const busySelector = () =>
  createSelector(launcherSelectorDomain, launcher => launcher.busy);

const unseenCountSelector = () =>
  createSelector(
    elementSelectorDomain,
    activitySelectorDomain,
    (selectors, activity) => {
      return _.defaultTo(
        _.chain(selectors.byId)
          .flatMap(x => _.values(x) || [])
          .flattenDeep()
          .union()

          // remove
          .filter(val => !_.has(activity.byId, val))
          .value().length,
        0
      );
    }
  );

export default {
  busySelector,
  unseenCountSelector
};
