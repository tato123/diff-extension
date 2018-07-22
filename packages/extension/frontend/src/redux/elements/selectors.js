import { createSelector } from "reselect";

const elementsDomain = state => state.elements;

const count = createSelector(elementsDomain, allIds => allIds.length || 0);

const ids = createSelector(elementsDomain, allIds => allIds || []);

export default {
  count,
  ids
};
