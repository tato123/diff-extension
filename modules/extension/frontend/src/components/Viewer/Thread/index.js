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
    .value();

const mapStateToProps = (state, props) => ({
  thread: selectThreadFromSelector(state, props.thread)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
