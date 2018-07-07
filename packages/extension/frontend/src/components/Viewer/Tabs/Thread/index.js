import View from "./Thread";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const mapStateToProps = (state, props) => ({
  cssSelector: props.match.params.id,
  navigateTo: props.history.push,
  basePath: props.match.path,
  currentUrl: props.match.url
});

const mapDispatchToProps = dispatch => ({
  addComment: dispatch.comment.addNewComment
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(View));
