import { connect } from "react-redux";
import View from "./Workspace";
import { actions } from "redux/widgets/workspace";
import { selectors } from "redux/entities/workspaces";

const mapStateToProps = state => ({
  workspaceName: selectors.workspaceNameSelector()(state),
  workspaceUsers: selectors.workspaceUsersSelector()(state)
});

const mapDispatchToProps = dispatch => ({
  addCollaborator: email => dispatch(actions.addWorkspaceUserRequest(email)),
  createWorkspace: name => dispatch(actions.createWorkspace(name)),
  workspace: null
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
