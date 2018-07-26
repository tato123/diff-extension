import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import View from "./View";
import { selectors, operations } from "redux/user";

const mapStateToProps = createStructuredSelector({
  accessToken: selectors.accessTokenSelector(),
  refreshToken: selectors.refreshTokenSelector()
});

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(operations.login(credentials)),
  getCacheToken: () => dispatch(operations.fetchCacheToken())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
