import { connect } from "react-redux";
import Login from "./Login";
import { actions, selectors } from "redux/user";

const makeCustomSelector = () => {
  const refreshTokenSelector = selectors.refreshTokenSelector();
  const isFetchingTokenSelector = selectors.isFetchingTokenSelector();
  const mapStateToProps = (state, props) => {
    return {
      refreshToken: refreshTokenSelector(state),
      isFetchingToken: isFetchingTokenSelector(state)
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(actions.login(credentials)),
  getCacheToken: () => dispatch(actions.fetchCacheToken()),
  signup: (email, password) => actions.asyncSignup(email, password, dispatch),
  validateEmail: email => actions.asyncValidate(email, dispatch)
});

export default connect(
  makeCustomSelector,
  mapDispatchToProps
)(Login);
