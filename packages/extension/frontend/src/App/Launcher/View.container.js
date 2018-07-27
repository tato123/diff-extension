import { connect } from "react-redux";
import View from "./View";

import { createStructuredSelector } from "reselect";
import { selectors } from "redux/widgets/launcher";

const mapStateToProps = createStructuredSelector({
  count: selectors.countSelector()
});

export default connect(mapStateToProps)(View);
