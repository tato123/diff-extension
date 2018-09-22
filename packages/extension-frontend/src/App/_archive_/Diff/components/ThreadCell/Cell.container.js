import { connect } from "react-redux";
import View from "./Cell";

import { selectors } from "redux/widgets/diff";

const mapStateToProps = (state, props) => ({
  thread: selectors.elementThreadSelector(props.thread)(state),
  users: selectors.allUsersSelector()(state),
  isNew: element => selectors.isNewItemSelector(element)(state)
});

export default connect(mapStateToProps)(View);
