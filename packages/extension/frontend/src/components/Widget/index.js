import UserView from "./Widget";
import { connect } from "react-redux";

import { selectors as userSelectors } from "redux/user";
import {
  selectors as widgetSelectors,
  actions as widgetActions
} from "redux/widgets";

const mapStateToProps = (state, props) => ({
  shown: widgetSelectors.shownSelector(props.name)(state),
  values: widgetSelectors.valuesSelector(props.name)(state),
  token: userSelectors.accessTokenSelector()(state)
});

const mapDispatchToProps = dispatch => ({
  closeAll: () => dispatch(widgetActions.closeAll()),
  show: widget => dispatch(widgetActions.show(widget))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);
