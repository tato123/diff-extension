import View from "./Selectors";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  selectors: state.selector.allIds
});

const mapDispatchToProps = dispatch => ({
  createNewSelector: dispatch.selector.createNewSelector
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
