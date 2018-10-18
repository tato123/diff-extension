import { createSelector } from 'reselect';
import _ from 'lodash-es';

const annotationsDomain = state => state.entities.annotations;
const reduxStateDomain = state => state;

const allAnnotationIdsSelector = createSelector(
  annotationsDomain,
  annotations => annotations.allIds || []
);

const makeAllCommentsSelector = selectorId =>
  createSelector(annotationsDomain, reduxStateDomain, (annotations, state) => {
    const selector = annotations.byId[selectorId];

    if (_.has(selector, 'transient')) {
      return [];
    }

    return _.chain(selector)
      .mapValues((value, key) =>
        value.map(id => state.entities[`${key}s`].byId[id])
      )
      .values()
      .flatten()
      .sortBy('meta.created')
      .reverse()
      .value();
  });

export default {
  allAnnotationIdsSelector,
  makeAllCommentsSelector
};
