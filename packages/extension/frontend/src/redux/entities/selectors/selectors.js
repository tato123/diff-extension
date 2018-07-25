import { createSelector } from "reselect";

const cssSelectorDomain = state => state.entities.selectors;

const cssSelectorIdsSelector = () =>
  createSelector(cssSelectorDomain, cssSelectors => cssSelectors.allIds);

export default {
  cssSelectorIdsSelector
};
