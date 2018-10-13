import { createSelector } from 'reselect';
import _ from 'lodash-es';

const annotationsDomain = state => state.entities.annotations;

const allAnnotationIdsSelector = createSelector(
  annotationsDomain,
  annotations => annotations.allIds || []
);

export default {
  allAnnotationIdsSelector
};
