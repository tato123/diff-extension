import View from "./View";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => ({
  cssSelector: ".h1.skeleton.round"
});

export default connect(mapStateToProps)(View);
