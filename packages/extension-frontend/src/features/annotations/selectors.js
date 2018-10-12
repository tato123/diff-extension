import { createSelector } from 'reselect';
import _ from 'lodash-es';

const annotationsDomain = state => state.entities.annotations;

const allAnnotationValuesSelector = createSelector(
  annotationsDomain,
  annotations => _.values(annotations.byId, [])
);

export default {
  allAnnotationValuesSelector
};
