import { createSelector } from 'reselect';
import _ from 'lodash-es';

const makeHashActivityRecordSelector = predicate =>
  createSelector(
    state => state.entities.activity.byId,
    activity => _.find(_.values(activity), predicate)
  );

export default {
  makeHashActivityRecordSelector
};
