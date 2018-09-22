import { createSelector } from "reselect";
import _ from "lodash";

const cssSelectorDomain = state => state.entities.selectors;

const cssSelectorIdsSelector = () =>
  createSelector(cssSelectorDomain, cssSelectors => cssSelectors.allIds);

const selectorForCssSelectorId = id =>
  createSelector(cssSelectorDomain, cssSelectors => cssSelectors.byId[id]);

const isSelectorEmpty = id =>
  createSelector(
    selectorForCssSelectorId(id),
    selector => _.keys(_.omit(selector, ["transient"])).length === 0
  );

const allCSSSelectors = () =>
  createSelector(cssSelectorDomain, selector => selector.allIds);

export default {
  cssSelectorIdsSelector,
  selectorForCssSelectorId,
  isSelectorEmpty,
  allCSSSelectors
};
