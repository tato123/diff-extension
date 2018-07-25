import { connect } from "react-redux";
import View from "./View";

import { createStructuredSelector } from "reselect";
import { selectors } from "redux/launcher";

const mapStateToProps = createStructuredSelector({
  busy: selectors.busySelector(),
  count: selectors.countSelector()
});

export default connect(mapStateToProps)(View);
