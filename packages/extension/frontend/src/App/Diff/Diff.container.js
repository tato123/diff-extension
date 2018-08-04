import Diff from "./Diff";
import { connect } from "react-redux";
import { operations, selectors, actions } from "redux/widgets/diff";

const mapStateToProps = (state, props) => ({
  cssSelector: props.context.selector,
  visibleIds: selectors.visibleIdsForSelector(props.context.selector)(state)
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(operations.closeDiff()),
  updateItemsSeen: ids => dispatch(actions.updateItemsSeen(ids))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diff);
