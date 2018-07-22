const closeDiff = () => dispatch => {
  dispatch.widgets.hide({ name: "diff" });
  dispatch.selector.inspect();
};

const closeAll = (payload, rootState) => dispatch => {
  rootState.widgets.forEach(widget => {
    if (!widget.static) {
      dispatch.widgets.hide(widget);
    }
  });
  dispatch.selector.cancelInspect();
};

export default {
  closeDiff,
  closeAll
};
