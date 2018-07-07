import View from "./View";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const mapStateToProps = (state, props) => ({
  cssSelector: props.match.params.id,
  pageUrl: "/selectors/:id/window"
});

export default connect(mapStateToProps)(withRouter(View));
