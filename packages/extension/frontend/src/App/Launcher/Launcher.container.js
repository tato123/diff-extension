import { connect } from "react-redux";
import Launcher from "./Launcher";

import { createStructuredSelector } from "reselect";
import { selectors } from "redux/widgets/launcher";

import { actions } from "redux/entities/activity";
const mapStateToProps = createStructuredSelector({
  count: selectors.unseenCountSelector()
});

const mapDispatchToProps = dispatch => ({
  test: () => dispatch(actions.createEventLogRequest("barney"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Launcher);
