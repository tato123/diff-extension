import { connect } from "react-redux";
import View from "./View";
import _ from "lodash";

const selectThreadFromSelector = (state, thread) =>
  _.chain(state.selector.byId[thread])
    .mapValues((value, key) => {
      return value.map(id => state[key].byId[id]);
    })
    .values()
    .flatten()
    .sortBy("meta.created")
    .reverse()
    .value();

const mapStateToProps = (state, props) => ({
  thread: selectThreadFromSelector(state, props.thread),
  users: state.user.byId
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
