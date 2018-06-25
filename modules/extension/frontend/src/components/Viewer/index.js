import Window from "./Window";
import { connect } from "react-redux";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addComment: dispatch.comment.addComment
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);
