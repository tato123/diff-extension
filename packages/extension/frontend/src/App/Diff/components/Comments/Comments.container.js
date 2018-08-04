import { connect } from "react-redux";
import View from "./Comments";

import { selectors } from "redux/widgets/diff";

const mapStateToProps = (state, props) => ({
  thread: selectors.elementThreadSelector(props.thread)(state),
  users: selectors.allUsersSelector()(state)
});

export default connect(mapStateToProps)(View);
