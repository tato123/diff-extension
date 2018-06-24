import View from "./View";
import { connect } from "react-redux";
import { select } from "@rematch/select";

const mapStateToProps = state => ({
  selectors: select.selector.ids(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
