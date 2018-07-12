import UserView from "./UserView";
import { connect } from "react-redux";

const mapStateToProps = (state, props) => ({
  shown: state.widgets.filter(x => x.name === props.name).length > 0,
  values: state.widgets.filter(x => x.name === props.name)[0],
  token: state.auth.access_token
});

const mapDispatchToProps = dispatch => ({
  toggle: dispatch.widgets.toggle
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView);
