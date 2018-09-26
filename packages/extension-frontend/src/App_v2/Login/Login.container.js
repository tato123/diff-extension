import { connect } from "react-redux";
import Login from "./Login";
import { actions, selectors } from "redux/user";

const makeCustomSelector = () => {
  const refreshTokenSelector = selectors.refreshTokenSelector();
  const isFetchingTokenSelector = selectors.isFetchingTokenSelector();
  const requiresLoginSelector = selectors.requiresLoginSelector();
  const formSelector = selectors.formSelector();
  const errorSelector = selectors.errorSelector();
  const isSubmittingSelector = selectors.isSubmittingSelector();

  const mapStateToProps = (state, props) => {
    return {
      refreshToken: refreshTokenSelector(state),
      isFetchingToken: isFetchingTokenSelector(state),
      requiresLogin: requiresLoginSelector(state),
      isSubmitting: isSubmittingSelector(state),
      form: formSelector(state),
      error: errorSelector(state)
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(actions.login(credentials)),
  getCacheToken: () => dispatch(actions.fetchCacheToken()),
  signup: (email, password, displayName) =>
    dispatch(actions.signupRequest(email, password, displayName)),
  validateEmail: email => dispatch(actions.validateUser(email, dispatch)),
  showForm: form => dispatch(actions.showForm(form))
});

export default connect(
  makeCustomSelector,
  mapDispatchToProps
)(Login);
