import UserView from "./Widget";
import { connect } from "react-redux";

import { selectors as userSelectors } from "redux/user";
import {
  selectors as widgetSelectors,
  actions as widgetActions,
  operations as widgetOperations
} from "redux/widgets/state";

const mapStateToProps = (state, props) => ({
  shown: widgetSelectors.shownSelector(props.name)(state),
  values: widgetSelectors.valuesSelector(props.name)(state),
  token: userSelectors.accessTokenSelector()(state)
});

const mapDispatchToProps = dispatch => ({
  closeAll: () => dispatch(widgetOperations.closeAll()),
  show: name => dispatch(widgetActions.show(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);
