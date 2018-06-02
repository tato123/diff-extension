import { createSelector } from "reselect";

const entitiesDomain = state => state && state.entities;

const sumEntities = entities => {
  return entities.selectors.map(selector => {
    return {
      selector,
      count: entities.threads[selector].length
    };
  });
};

export const cssRulesLengthSelector = createSelector(entitiesDomain, entites =>
  sumEntities(entites).reduce((a, e) => a + e.count, 0)
);

export const cssRulesSelector = createSelector(
  entitiesDomain,
  entites => entites.selectors || []
);

export const threadsSelector = createSelector(
  entitiesDomain,
  entites => entites.threads || []
);

export const threadCountForSelectors = createSelector(
  entitiesDomain,
  sumEntities
);

export const threadForIdSelector = threadId =>
  createSelector(entitiesDomain, entites => entites.threads[threadId]);
