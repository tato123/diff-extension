import { connect } from "react-redux";
import View from "./View";
import { select } from "@rematch/select";

const mapStateToProps = state => ({
  busy: state.launcher.busy,
  count: select.selector.count(state)
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
