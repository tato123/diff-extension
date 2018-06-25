import View from "./View";
import { connect } from "react-redux";
import { select } from "@rematch/select";

const mapStateToProps = state => ({
  selectors: state.selector.allIds
});

export default connect(mapStateToProps)(View);
