import View from "./TaggedElements";
import { connect } from "react-redux";
import { selectors } from "redux/entities/selectors";

const mapStateToProps = (state, props) => ({
  tagged: selectors.allCSSSelectors()(state)
});

export default connect(mapStateToProps)(View);
