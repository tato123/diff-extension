import { connect } from "react-redux";
import View from "./View";

const mapStateToProps = ({
  auth: { access_token: accessToken, refresh_token: refreshToken }
}) => ({
  accessToken,
  refreshToken
});

const mapDispatchToProps = ({
  auth: { login, fetchCatchTokenAsync: getCacheToken }
}) => ({
  login,
  getCacheToken
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
