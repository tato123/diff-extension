import { connect } from "react-redux";
import View from "./Comments";

import { selectors } from "diff";

const mapStateToProps = (state, props) => ({
  thread: selectors.elementThreadSelector(props.thread)(state),
  users: selectors.allUsersSelector()(state)
});

export default connect(mapStateToProps)(View);
