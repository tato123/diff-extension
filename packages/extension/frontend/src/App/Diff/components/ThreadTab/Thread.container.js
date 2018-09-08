import View from "./Thread";
import { connect } from "react-redux";
import { actions } from "redux/widgets/diff";

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
  addComment: (comment, selector, attachments) =>
    dispatch(actions.addComment(comment, selector, attachments))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
