import View from "./View";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => ({
  cssSelector: props.context.selector
});

const mapDispatchToProps = dispatch => ({
  close: dispatch.widgets.closeDiff
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
