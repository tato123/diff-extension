import actions from "./actions";
import { actions as selectorActions } from "../selectors";

const closeAll = name => (dispatch, getState) => {
  const state = getState();
  dispatch(selectorActions.cancelInspect());

  state.widgets.state.forEach(widget => {
    if (!widget.static) {
      dispatch(actions.hide(widget.name));
    }
  });
};

export default {
  closeAll
};
