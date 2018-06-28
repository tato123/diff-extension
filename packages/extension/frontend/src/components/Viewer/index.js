import Window from "./Window";
import { connect } from "react-redux";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addComment: dispatch.comment.addNewComment
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);
