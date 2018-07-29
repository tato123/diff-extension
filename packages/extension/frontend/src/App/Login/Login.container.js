import { connect } from "react-redux";
import Login from "./Login";
import { operations } from "redux/user";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(operations.login(credentials)),
  getCacheToken: () => dispatch(operations.fetchCacheToken()),
  signup: (email, password) => dispatch(operations.signup(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
