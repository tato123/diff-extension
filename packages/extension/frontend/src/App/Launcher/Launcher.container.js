import { connect } from "react-redux";
import Launcher from "./Launcher";

import { createStructuredSelector } from "reselect";
import { selectors } from "redux/widgets/launcher";

const mapStateToProps = createStructuredSelector({
  count: selectors.countSelector()
});

export default connect(mapStateToProps)(Launcher);