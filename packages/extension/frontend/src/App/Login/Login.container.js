import { connect } from "react-redux";
import Login from "./Login";
import { actions, selectors } from "redux/user";

const makeCustomSelector = () => {
  const refreshTokenSelector = selectors.refreshTokenSelector();
  const isFetchingTokenSelector = selectors.isFetchingTokenSelector();
  const requiresLoginSelector = selectors.requiresLoginSelector();
  const mapStateToProps = (state, props) => {
    return {
      refreshToken: refreshTokenSelector(state),
      isFetchingToken: isFetchingTokenSelector(state),
      requiresLogin: requiresLoginSelector(state),
      isSubmitting: false
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(actions.login(credentials)),
  getCacheToken: () => dispatch(actions.fetchCacheToken()),
  signup: (email, password) => dispatch(actions.signupRequest(email, password)),
  validateEmail: email => dispatch(actions.validateUser(email, dispatch))
});

export default connect(
  makeCustomSelector,
  mapDispatchToProps
)(Login);
