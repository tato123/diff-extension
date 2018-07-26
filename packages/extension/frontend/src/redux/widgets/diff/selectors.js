import { createSelector } from "reselect";
import _ from "lodash";

// all of our comments
const cssSelectorSelectors = state => state.entities.selectors;

// all of our users
const usersSelector = state => state.entities.users;
// state
const stateSelector = state => state;

/**
 * Flattens
 * @params {String}
 * @returns {Function}
 */
const elementThreadSelector = cssSelector =>
  createSelector(cssSelectorSelectors, stateSelector, (cssSelectors, state) => {
    const selector = cssSelectors.byId[cssSelector];
    if (_.has(selector, "transient")) {
      return [];
    }

    return _.chain(selector)
      .mapValues((value, key) => {
        return value.map(id => state.entities[key + "s"].byId[id]);
      })
      .values()
      .flatten()
      .sortBy("meta.created")
      .reverse()
      .value();
  });

const allUsersSelector = () =>
  createSelector(usersSelector, users => users.byId);

export default {
  elementThreadSelector,
  allUsersSelector
};
