import { connect } from 'react-redux';
import { selectors as userSelectors } from 'redux/user';
import UserView from './Widget';

import {
  selectors as widgetSelectors,
  actions as widgetActions
} from 'redux/widgets/state';

const mapStateToProps = (state, props) => ({
  shown: widgetSelectors.shownSelector(props.name)(state),
  values: widgetSelectors.valuesSelector(props.name)(state),
  token: userSelectors.accessTokenSelector()(state)
});

const mapDispatchToProps = dispatch => ({
  closeAll: () => dispatch(widgetActions.closeAll()),
  show: name => dispatch(widgetActions.show(name)),
  hide: name => dispatch(widgetActions.hide(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);
