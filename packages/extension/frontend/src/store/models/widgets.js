import { createSelector } from "reselect";

export default {
  state: [
    {
      name: "launcher",
      static: true
    }
  ],
  reducers: {
    show: (state, payload) => [...state, payload],
    hide: (state, payload) => state.filter(x => x.name !== payload.name)
  },
  selectors: {
    isVisible: name =>
      createSelector(
        state => state,
        widgets => widgets.filter(x => x.name === name).length > 0
      )
  },
  effects: dispatch => ({
    closeDiff: () => {
      dispatch.widgets.hide({ name: "diff" });
      dispatch.selector.inspect();
    },
    closeAll: (payload, rootState) => {
      rootState.widgets.forEach(widget => {
        if (!widget.static) {
          dispatch.widgets.hide(widget);
        }
      });
      dispatch.selector.cancelInspect();
    }
  })
};
