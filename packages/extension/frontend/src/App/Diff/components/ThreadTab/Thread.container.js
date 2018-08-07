import View from "./Thread";
import { connect } from "react-redux";
import { operations } from "redux/widgets/diff";

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
  addComment: comment => dispatch(operations.addNewComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
