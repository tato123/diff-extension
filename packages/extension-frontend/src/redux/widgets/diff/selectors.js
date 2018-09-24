import { createSelector } from 'reselect';
import _ from 'lodash-es';

// all of our comments
const cssSelectorSelectors = state => state.entities.selectors;
const activitySelectorDomain = state => state.entities.activity;

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
    if (_.has(selector, 'transient')) {
      return [];
    }

    return _.chain(selector)
      .mapValues((value, key) => {
        return value.map(id => state.entities[key + 's'].byId[id]);
      })
      .values()
      .flatten()
      .sortBy('meta.created')
      .reverse()
      .value();
  });

const allUsersSelector = () =>
  createSelector(usersSelector, users => users.byId);

const visibleIdsForSelector = cssSelector =>
  createSelector(
    elementThreadSelector(cssSelector),
    items => items.map(item => item.id) || []
  );

const isNewItemSelector = itemId =>
  createSelector(activitySelectorDomain, activity => {
    return !_.has(activity.byId, itemId);
  });

export default {
  elementThreadSelector,
  allUsersSelector,
  visibleIdsForSelector,
  isNewItemSelector
};
