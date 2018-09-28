import { connect } from 'react-redux';
import _ from 'lodash-es';
import View from './FeatureFlag';

const mapStateToProps = (state, props) => ({
  flag: _.get(state.user.featureFlags, props.name, false)
});

export default connect(
  mapStateToProps,
  null,
  null
)(View);
