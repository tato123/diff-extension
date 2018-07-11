import View from "./Thread";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
  addComment: dispatch.comment.addNewComment
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
