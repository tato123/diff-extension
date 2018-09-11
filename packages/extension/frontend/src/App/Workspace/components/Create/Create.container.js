import { connect } from "react-redux";
import View from "./Create";
import { actions, selectors } from "redux/widgets/workspace";

const makeMapStateToProps = () => {
  const isSubmitting = selectors.isCreateWorkspaceSubmittingSelector();
  const isSubmitError = selectors.isCreateWorkspaceSubmitErrorSelector();

  return state => ({
    isSubmitting: isSubmitting(state),
    isSubmitError: isSubmitError(state)
  });
};

const mapDispatchToProps = dispatch => ({
  createWorkspace: (name, emails) =>
    dispatch(actions.createWorkspace(name, emails))
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(View);