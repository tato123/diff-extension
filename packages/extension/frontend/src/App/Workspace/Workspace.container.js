import { connect } from "react-redux";
import View from "./Workspace";
import { actions } from "redux/widgets/workspace";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addCollaborator: email => dispatch(actions.addWorkspaceUserRequest(email)),
  createWorkspace: name => dispatch(actions.createWorkspace(name)),
  workspace: null
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
