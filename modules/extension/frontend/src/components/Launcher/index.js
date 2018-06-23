import { connect } from "react-redux";
import View from "./View";

const mapStateToProps = ({ launcher: { busy } }) => ({ busy });
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
