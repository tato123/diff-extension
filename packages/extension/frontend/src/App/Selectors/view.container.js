import View from "./view";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  selectors: state.selector.allIds,
  inspectMode: state.selector.inspectMode
});

const mapDispatchToProps = dispatch => ({
  showSelectorDetails: dispatch.selector.toggleDiffForSelector,
  inspect: dispatch.selector.inspect,
  cancelInspect: dispatch.selector.cancelInspect
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
