import { createSelector } from 'reselect';
import _ from 'lodash-es';

const makeHashActivityRecordSelector = predicate =>
  createSelector(
    state => state.entities.activity.byId,
    activity => _.find(_.values(activity), predicate)
  );

const inspectorActiveSelector = createSelector(
  state => state.inspector,
  inspector => inspector.active
);

export default {
  makeHashActivityRecordSelector,
  inspectorActiveSelector
};
