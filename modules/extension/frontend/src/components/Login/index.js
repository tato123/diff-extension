import { connect } from "react-redux";
import View from "./View";
import { ACTIONS } from "@diff/common/keys";

const mapStateToProps = ({
  user: { access_token: accessToken, refresh_token: refreshToken }
}) => ({
  accessToken,
  refreshToken
});

const mapDispatchToProps = ({
  user: { login, fetchCatchTokenAsync: getCacheToken }
}) => ({
  login,
  getCacheToken
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
