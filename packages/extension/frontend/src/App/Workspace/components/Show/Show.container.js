import { connect } from "react-redux";
import View from "./Show";
import { actions } from "redux/widgets/workspace";
import { selectors } from "redux/entities/workspaces";

const mapStateToProps = state => ({
  workspaceName: selectors.currentWorkspaceNameSelector()(state),
  workspaceUsers: selectors.currentWorkspaceUsersSelector()(state),
  workspaceId: selectors.currentWorkspaceIdSelector()(state),
  invitedUsers: selectors.invitedUsersSelector()(state)
});

const mapDispatchToProps = dispatch => ({
  addCollaborator: (...args) => dispatch(actions.addWorkspaceUser(...args)),
  createWorkspace: name => dispatch(actions.createWorkspace(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
