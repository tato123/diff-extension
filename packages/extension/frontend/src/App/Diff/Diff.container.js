import Diff from "./Diff";
import { connect } from "react-redux";
import { operations } from "redux/widgets/diff";

const mapStateToProps = (state, props) => ({
  cssSelector: props.context.selector
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(operations.closeDiff())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diff);
