// @flow
import { createSelector } from "reselect";
import { findIndex } from "lodash";

export default {
  state: [
    {
      name: "launcher",
      static: true
    }
  ],
  reducers: {
    show: (state, payload) => [...state, payload],
    hide: (state, payload) => state.filter(x => x.name === payload.name),

    closeAll: (state, payload) =>
      state.reduce((acc, widget) => {
        if (widget.static) {
          return [...acc, widget];
        }
        return acc;
      }, [])
  },
  selectors: {
    isVisible: name =>
      createSelector(
        state => state,
        widgets => widgets.filter(x => x.name === name).length > 0
      )
  }
};
