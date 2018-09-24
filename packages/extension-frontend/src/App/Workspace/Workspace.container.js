import { connect } from "react-redux";
import View from "./Workspace";
import { selectors } from "redux/entities/workspaces";

const makeMapStateToProps = () => {
  const currentWorkspace = selectors.currentWorkspaceIdSelector();
  return (state, props) => ({
    workspaceId: currentWorkspace(state)
  });
};

export default connect(makeMapStateToProps)(View);
