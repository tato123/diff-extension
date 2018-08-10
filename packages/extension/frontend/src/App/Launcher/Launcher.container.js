import { connect } from "react-redux";
import Launcher from "./Launcher";

import { createStructuredSelector } from "reselect";
import { selectors } from "redux/widgets/launcher";
import { actions as widgetActions } from "redux/widgets/state";

const mapStateToProps = createStructuredSelector({
  count: selectors.unseenCountSelector()
});

const mapDispatchToProps = dispatch => ({
  showWidget: name => dispatch(widgetActions.show(name)),
  hideWidget: name => dispatch(widgetActions.hide(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Launcher);
