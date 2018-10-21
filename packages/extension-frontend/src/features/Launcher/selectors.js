import { createSelector } from 'reselect';

const countSelector = createSelector(state => state, () => 0);

const isInspectingSelector = createSelector(
  state => state.inspector,
  inspector => inspector.active
);

export default {
  isInspectingSelector,
  countSelector
};
