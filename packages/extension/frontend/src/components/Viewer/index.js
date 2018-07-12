import View from "./View";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => ({
  cssSelector: props.context.selector
});

export default connect(mapStateToProps)(View);
