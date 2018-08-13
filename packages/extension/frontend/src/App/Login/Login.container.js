import { connect } from "react-redux";
import Login from "./Login";
import { actions, operations } from "redux/user";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(operations.login(credentials)),
  getCacheToken: () => dispatch(operations.fetchCacheToken()),
  signup: (email, password) => actions.asyncSignup(email, password, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
